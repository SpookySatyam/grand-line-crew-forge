import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
app.set('trust proxy', 1); // Trust first proxy for cookies over HTTPS

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

import authRoutes from './routes/authRoutes.js';
import recruitRoutes from './routes/recruitRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import crewRoutes from './routes/crewRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running properly' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recruits', recruitRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/crews', crewRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
