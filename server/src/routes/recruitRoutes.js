import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import validateObjectId from '../middleware/validateObjectId.js';
import {
  getRecruits,
  getRecruitById,
  createRecruit,
  updateRecruit,
  deleteRecruit
} from '../controllers/recruitController.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

router.route('/')
  .get(getRecruits)
  .post(createRecruit);

router.route('/:id')
  .all(validateObjectId)
  .get(getRecruitById)
  .put(updateRecruit)
  .delete(deleteRecruit);

export default router;
