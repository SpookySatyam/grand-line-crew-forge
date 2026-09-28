import { z } from 'zod';
import { Recruit } from '../models/Recruit.js';
import { Crew } from '../models/Crew.js';

const roleMap = {
  captain: 'Captain',
  navigator: 'Navigator',
  sniper: 'Sniper',
  chef: 'Chef',
  doctor: 'Doctor',
  shipwright: 'Shipwright'
};

const recruitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  skills: z.array(z.string()).min(1, 'At least 1 skill is required'),
  interests: z.array(z.string()).optional().default([]),
  roleKey: z.enum(['captain', 'navigator', 'sniper', 'chef', 'doctor', 'shipwright'], {
    errorMap: () => ({ message: 'Invalid role selection' }),
  }),
});

// @desc    Get all recruits
// @route   GET /api/recruits
// @access  Private
export const getRecruits = async (req, res, next) => {
  try {
    const query = { owner: req.user._id };

    if (req.query.role) {
      query.roleKey = req.query.role;
    }

    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const recruits = await Recruit.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: recruits });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recruit by ID
// @route   GET /api/recruits/:id
// @access  Private
export const getRecruitById = async (req, res, next) => {
  try {
    const recruit = await Recruit.findOne({ _id: req.params.id, owner: req.user._id });
    if (!recruit) {
      res.status(404);
      throw new Error('Recruit not found');
    }
    res.json({ success: true, data: recruit });
  } catch (error) {
    next(error);
  }
};

// @desc    Create recruit
// @route   POST /api/recruits
// @access  Private
export const createRecruit = async (req, res, next) => {
  try {
    const validatedData = recruitSchema.parse(req.body);
    
    const recruit = await Recruit.create({
      ...validatedData,
      role: roleMap[validatedData.roleKey],
      owner: req.user._id,
    });

    res.status(201).json({ success: true, data: recruit });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400);
      return next(new Error(error.issues?.[0]?.message || error.errors?.[0]?.message || 'Validation Error'));
    }
    next(error);
  }
};

// @desc    Update recruit
// @route   PUT /api/recruits/:id
// @access  Private
export const updateRecruit = async (req, res, next) => {
  try {
    // Validate if any body provided, but allow partial updates
    const updateSchema = recruitSchema.partial();
    const validatedData = updateSchema.parse(req.body);

    let updatePayload = { ...validatedData };
    if (validatedData.roleKey) {
      updatePayload.role = roleMap[validatedData.roleKey];
    }

    const recruit = await Recruit.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!recruit) {
      res.status(404);
      throw new Error('Recruit not found');
    }

    res.json({ success: true, data: recruit });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400);
      return next(new Error(error.issues?.[0]?.message || error.errors?.[0]?.message || 'Validation Error'));
    }
    next(error);
  }
};

// @desc    Delete recruit
// @route   DELETE /api/recruits/:id
// @access  Private
export const deleteRecruit = async (req, res, next) => {
  try {
    const recruit = await Recruit.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!recruit) {
      res.status(404);
      throw new Error('Recruit not found');
    }

    // Remove this recruit from any crews belonging to this user
    await Crew.updateMany(
      { owner: req.user._id },
      { $pull: { members: req.params.id } }
    );

    res.json({ success: true, message: 'Recruit removed' });
  } catch (error) {
    next(error);
  }
};
