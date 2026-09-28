import mongoose from 'mongoose';

const recruitSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    roleKey: {
      type: String,
      enum: ['captain', 'navigator', 'sniper', 'chef', 'doctor', 'shipwright'],
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Recruit = mongoose.model('Recruit', recruitSchema);
