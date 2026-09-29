import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    // If no external MongoDB is available or connection fails, use in-memory MongoDB
    if (!uri || uri.includes('localhost') || uri.includes('127.0.0.1')) {
      try {
        // Try connecting to the configured URI first
        if (uri) {
          await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
          console.log(`MongoDB Connected: ${mongoose.connection.host}`);
          return;
        }
      } catch {
        console.log('External/Local MongoDB not available, starting in-memory MongoDB...');
        await mongoose.disconnect().catch(() => {});
      }

      // Fall back to in-memory MongoDB
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.warn('\n======================================================');
      console.warn('⚠️ WARNING: Using in-memory MongoDB (mongodb-memory-server)');
      console.warn('⚠️ ALL DATA IS TEMPORARY AND WILL RESET ON SERVER RESTART.');
      console.warn('⚠️ Provide a valid MONGODB_URI for persistent storage.');
      console.warn('======================================================\n');
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
  process.exit(0);
});
