import mongoose from 'mongoose';
import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

let isConnected = false;

// We wrap the Express app so we can establish the DB connection
// before processing the request in the Serverless Function environment
export default async function handler(req, res) {
  if (!isConnected) {
    // If the database connection isn't established yet, connect it
    try {
      await connectDB();
      // Check if mongoose actually connected
      isConnected = mongoose.connection.readyState === 1;
    } catch (error) {
      console.error('Failed to connect to database in Vercel function:', error);
      return res.status(500).json({ success: false, message: 'Database connection failed' });
    }
  }

  // Forward the request to the Express application
  return app(req, res);
}
