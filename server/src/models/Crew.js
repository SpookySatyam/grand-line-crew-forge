import mongoose from 'mongoose';

const crewSchema = new mongoose.Schema(
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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruit',
      }
    ],
    balanceScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
    },
    compatibilityScore: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export const Crew = mongoose.model('Crew', crewSchema);
