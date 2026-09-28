import { z } from 'zod';
import { Challenge } from '../models/Challenge.js';
import { Crew } from '../models/Crew.js';

const challengeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['Easy', 'Normal', 'Hard'], { errorMap: () => ({ message: 'Invalid difficulty' }) }),
  type: z.enum(['Frontend', 'Backend', 'Fullstack'], { errorMap: () => ({ message: 'Invalid type' }) }),
  requiredSkills: z.array(z.string()).optional().default([]),
  requiredRoles: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  minTeamSize: z.number().optional().default(1),
});

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Private
export const getChallenges = async (req, res, next) => {
  try {
    const challenges = await Challenge.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: challenges });
  } catch (error) {
    next(error);
  }
};

// @desc    Get challenge by ID
// @route   GET /api/challenges/:id
// @access  Private
export const getChallengeById = async (req, res, next) => {
  try {
    const challenge = await Challenge.findOne({ _id: req.params.id, owner: req.user._id });
    if (!challenge) {
      res.status(404);
      throw new Error('Challenge not found');
    }
    res.json({ success: true, data: challenge });
  } catch (error) {
    next(error);
  }
};

// @desc    Create challenge
// @route   POST /api/challenges
// @access  Private
export const createChallenge = async (req, res, next) => {
  try {
    const validatedData = challengeSchema.parse(req.body);
    
    const challenge = await Challenge.create({
      ...validatedData,
      owner: req.user._id,
    });

    res.status(201).json({ success: true, data: challenge });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400);
      return next(new Error(error.issues?.[0]?.message || error.errors?.[0]?.message || 'Validation Error'));
    }
    next(error);
  }
};

// @desc    Update challenge
// @route   PUT /api/challenges/:id
// @access  Private
export const updateChallenge = async (req, res, next) => {
  try {
    const updateSchema = challengeSchema.partial();
    const validatedData = updateSchema.parse(req.body);

    const challenge = await Challenge.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      validatedData,
      { new: true, runValidators: true }
    );

    if (!challenge) {
      res.status(404);
      throw new Error('Challenge not found');
    }

    res.json({ success: true, data: challenge });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400);
      return next(new Error(error.issues?.[0]?.message || error.errors?.[0]?.message || 'Validation Error'));
    }
    next(error);
  }
};

// @desc    Delete challenge
// @route   DELETE /api/challenges/:id
// @access  Private
export const deleteChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!challenge) {
      res.status(404);
      throw new Error('Challenge not found');
    }

    // Remove this challenge from any crews belonging to this user
    await Crew.updateMany(
      { owner: req.user._id, challenge: req.params.id },
      { $unset: { challenge: "" } }
    );

    res.json({ success: true, message: 'Challenge removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed default challenges
// @route   POST /api/challenges/seed-defaults
// @access  Private
export const seedDefaults = async (req, res, next) => {
  try {
    const count = await Challenge.countDocuments({ owner: req.user._id });
    
    if (count > 0) {
      return res.status(400).json({ success: false, message: 'User already has challenges' });
    }

    const defaultChallenges = [
      {
        title: "AI Healthcare Assistant",
        description: "Develop a secure AI assistant capable of parsing medical data safely.",
        difficulty: "Hard",
        type: "Fullstack",
        requiredSkills: ["Python", "Machine Learning", "Database"],
        requiredRoles: ["Captain", "Doctor", "Navigator"],
        tags: ["AI", "Healthcare", "Data"],
        minTeamSize: 3,
        owner: req.user._id
      },
      {
        title: "Decentralized Pirate Wallet",
        description: "A secure blockchain wallet to store plunder across the Grand Line.",
        difficulty: "Normal",
        type: "Fullstack",
        requiredSkills: ["Solidity", "JavaScript", "Web Development"],
        requiredRoles: ["Captain", "Shipwright", "Sniper"],
        tags: ["Blockchain", "Security", "Finance"],
        minTeamSize: 2,
        owner: req.user._id
      }
    ];

    const inserted = await Challenge.insertMany(defaultChallenges);
    res.status(201).json({ success: true, data: inserted });
  } catch (error) {
    next(error);
  }
};
