import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Normal', 'Hard'],
      required: true,
    },
    type: {
      type: String,
      enum: ['Frontend', 'Backend', 'Fullstack'],
      required: true,
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    requiredRoles: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    minTeamSize: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export const Challenge = mongoose.model('Challenge', challengeSchema);
