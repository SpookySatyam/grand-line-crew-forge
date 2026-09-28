import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import validateObjectId from '../middleware/validateObjectId.js';
import {
  formCrews,
  getCrews,
  updateCrew,
  deleteCrew,
  assignChallenges,
  assignManualChallenge
} from '../controllers/crewController.js';

const router = express.Router();

router.use(requireAuth);

router.post('/form', formCrews);
router.post('/assign-challenges', assignChallenges);

router.route('/')
  .get(getCrews);

router.route('/:id')
  .all(validateObjectId)
  .put(updateCrew)
  .delete(deleteCrew);

router.put('/:id/challenge', validateObjectId, assignManualChallenge);

export default router;
