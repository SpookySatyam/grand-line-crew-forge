import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import validateObjectId from '../middleware/validateObjectId.js';
import {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  seedDefaults
} from '../controllers/challengeController.js';

const router = express.Router();

router.use(requireAuth);

router.post('/seed-defaults', seedDefaults);

router.route('/')
  .get(getChallenges)
  .post(createChallenge);

router.route('/:id')
  .all(validateObjectId)
  .get(getChallengeById)
  .put(updateChallenge)
  .delete(deleteChallenge);

export default router;
