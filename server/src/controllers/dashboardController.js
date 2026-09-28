import mongoose from 'mongoose';
import { Recruit } from '../models/Recruit.js';
import { Crew } from '../models/Crew.js';
import { Challenge } from '../models/Challenge.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req, res, next) => {
  try {
    const owner = req.user._id;
    // Aggregate pipelines don't auto-cast like find(), so we need a proper ObjectId
    const ownerObjectId = new mongoose.Types.ObjectId(owner);

    // 1. Total Recruits
    const totalRecruits = await Recruit.countDocuments({ owner });

    // 2. Count per role
    const roleCountsAggr = await Recruit.aggregate([
      { $match: { owner: ownerObjectId } },
      { $group: { _id: '$roleKey', count: { $sum: 1 } } }
    ]);
    
    // Format into a key-value object: { captain: 2, sniper: 1, ... }
    const roleCounts = {};
    roleCountsAggr.forEach(r => {
      roleCounts[r._id] = r.count;
    });

    // 3. Top Skills (useful for CrewSynergy)
    const skillsAggr = await Recruit.aggregate([
      { $match: { owner: ownerObjectId } },
      { $unwind: '$skills' },
      { $group: { _id: '$skills', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    // 4. Top Interests (useful for CrewSynergy)
    const interestsAggr = await Recruit.aggregate([
      { $match: { owner: ownerObjectId } },
      { $unwind: '$interests' },
      { $group: { _id: '$interests', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    // 5. Total Crews
    const totalCrews = await Crew.countDocuments({ owner });

    // 6. Average Balance Score
    const balanceAggr = await Crew.aggregate([
      { $match: { owner: ownerObjectId } },
      { $group: { _id: null, averageBalanceScore: { $avg: '$balanceScore' } } }
    ]);
    const averageBalanceScore = balanceAggr.length > 0 ? Math.round(balanceAggr[0].averageBalanceScore) : 0;

    // 7. Total Challenges
    const totalChallenges = await Challenge.countDocuments({ owner });

    res.json({
      success: true,
      data: {
        totalRecruits,
        roleCounts,
        topSkills: skillsAggr.map(s => ({ skill: s._id, count: s.count })),
        topInterests: interestsAggr.map(i => ({ interest: i._id, count: i.count })),
        totalCrews,
        averageBalanceScore,
        totalChallenges
      }
    });
  } catch (error) {
    next(error);
  }
};
