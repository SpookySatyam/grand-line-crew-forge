import { Crew } from '../models/Crew.js';
import { Recruit } from '../models/Recruit.js';
import { Challenge } from '../models/Challenge.js';
import { calculateBalanceScore, calculateCompatibilityScore } from '../utils/scoring.js';

// @desc    Form new crews automatically
// @route   POST /api/crews/form
// @access  Private
export const formCrews = async (req, res, next) => {
  try {
    const { teamSize } = req.body;
    if (!teamSize || teamSize < 2) {
      return res.status(400).json({ success: false, message: 'Invalid teamSize. Must be at least 2.' });
    }

    const recruits = await Recruit.find({ owner: req.user._id });

    if (recruits.length < teamSize) {
      return res.status(400).json({ 
        success: false, 
        message: `Not enough recruits. You need at least ${teamSize} recruits to form a proper crew.` 
      });
    }

    // Delete existing crews
    await Crew.deleteMany({ owner: req.user._id });

    // Distribute logic: Try to separate duplicate roles
    // 1. Group by role
    const grouped = recruits.reduce((acc, r) => {
      acc[r.roleKey] = acc[r.roleKey] || [];
      acc[r.roleKey].push(r);
      return acc;
    }, {});

    // 2. Flatten by taking one from each group sequentially
    let sortedRecruits = [];
    const keys = Object.keys(grouped);
    let hasMore = true;
    while (hasMore) {
      hasMore = false;
      for (const key of keys) {
        if (grouped[key].length > 0) {
          sortedRecruits.push(grouped[key].shift());
          hasMore = true;
        }
      }
    }

    // 3. Chunk into teams
    const crewsToCreate = [];
    let currentMembers = [];
    let crewIndex = 1;

    for (let i = 0; i < sortedRecruits.length; i++) {
      currentMembers.push(sortedRecruits[i]);
      
      // If we hit teamSize, or it's the very last recruit
      if (currentMembers.length === teamSize || i === sortedRecruits.length - 1) {
        crewsToCreate.push({
          owner: req.user._id,
          name: `Crew ${crewIndex}`,
          members: currentMembers.map(m => m._id),
          balanceScore: calculateBalanceScore(currentMembers),
        });
        currentMembers = [];
        crewIndex++;
      }
    }

    // Save
    const createdCrews = await Crew.insertMany(crewsToCreate);
    
    // Return populated
    const populated = await Crew.find({ _id: { $in: createdCrews.map(c => c._id) } })
                                .populate('members')
                                .populate('challenge');

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all crews
// @route   GET /api/crews
// @access  Private
export const getCrews = async (req, res, next) => {
  try {
    const crews = await Crew.find({ owner: req.user._id })
      .populate('members')
      .populate('challenge');
    res.json({ success: true, data: crews });
  } catch (error) {
    next(error);
  }
};

// @desc    Update crew
// @route   PUT /api/crews/:id
// @access  Private
export const updateCrew = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    let updatePayload = {};
    if (name) updatePayload.name = name;
    if (members) updatePayload.members = members;

    // Optional: recalculate balanceScore if members change?
    if (members) {
      const populatedMembers = await Recruit.find({ _id: { $in: members }, owner: req.user._id });
      updatePayload.balanceScore = calculateBalanceScore(populatedMembers);
    }

    const crew = await Crew.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updatePayload,
      { new: true }
    ).populate('members').populate('challenge');

    if (!crew) {
      res.status(404);
      throw new Error('Crew not found');
    }

    // Re-evaluate compatibility if members changed and challenge exists
    if (members && crew.challenge) {
      crew.compatibilityScore = calculateCompatibilityScore(crew.members, crew.challenge);
      await crew.save();
    }

    res.json({ success: true, data: crew });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete crew
// @route   DELETE /api/crews/:id
// @access  Private
export const deleteCrew = async (req, res, next) => {
  try {
    const crew = await Crew.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!crew) {
      res.status(404);
      throw new Error('Crew not found');
    }
    res.json({ success: true, message: 'Crew removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Auto-assign challenges to all crews
// @route   POST /api/crews/assign-challenges
// @access  Private
export const assignChallenges = async (req, res, next) => {
  try {
    const crews = await Crew.find({ owner: req.user._id }).populate('members');
    const challenges = await Challenge.find({ owner: req.user._id });

    if (crews.length === 0) {
      return res.status(400).json({ success: false, message: 'No crews exist' });
    }
    if (challenges.length === 0) {
      return res.status(400).json({ success: false, message: 'No challenges exist' });
    }

    // Simple round-robin assignment mapping algorithm
    for (let i = 0; i < crews.length; i++) {
      const challenge = challenges[i % challenges.length];
      const compScore = calculateCompatibilityScore(crews[i].members, challenge);
      
      crews[i].challenge = challenge._id;
      crews[i].compatibilityScore = compScore;
      await crews[i].save();
    }

    const updatedCrews = await Crew.find({ owner: req.user._id })
      .populate('members')
      .populate('challenge');

    res.json({ success: true, data: updatedCrews });
  } catch (error) {
    next(error);
  }
};

// @desc    Manually assign challenge to specific crew
// @route   PUT /api/crews/:id/challenge
// @access  Private
export const assignManualChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.body;
    
    const crew = await Crew.findOne({ _id: req.params.id, owner: req.user._id }).populate('members');
    if (!crew) {
      res.status(404);
      throw new Error('Crew not found');
    }

    if (!challengeId) {
      // Remove challenge
      crew.challenge = undefined;
      crew.compatibilityScore = undefined;
      await crew.save();
    } else {
      const challenge = await Challenge.findOne({ _id: challengeId, owner: req.user._id });
      if (!challenge) {
        res.status(404);
        throw new Error('Challenge not found');
      }

      crew.challenge = challenge._id;
      crew.compatibilityScore = calculateCompatibilityScore(crew.members, challenge);
      await crew.save();
    }

    // Return fully populated
    const populated = await Crew.findById(crew._id).populate('members').populate('challenge');
    res.json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
};
