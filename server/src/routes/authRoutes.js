import express from 'express';
import rateLimit from 'express-rate-limit';
import { signupUser, loginUser, logoutUser, getMe } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => req.ip || req.headers['x-forwarded-for'] || 'unknown',
  message: { success: false, message: 'Too many authentication attempts, please try again after 15 minutes' },
});

router.post('/signup', authLimiter, signupUser);
router.post('/login', authLimiter, loginUser);
router.post('/logout', logoutUser);
router.get('/me', requireAuth, getMe);

export default router;
