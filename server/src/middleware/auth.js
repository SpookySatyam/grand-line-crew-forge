import { Client, Account } from 'node-appwrite';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    let bearerToken = null;

    // 1. Check for Authorization: Bearer <appwrite-jwt>
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      bearerToken = authHeader.split(' ')[1];
    }

    // 2. Validate Appwrite token if present
    if (bearerToken) {
      try {
        const endpoint = process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
        const projectId = process.env.APPWRITE_PROJECT_ID || '6ababea6002376bc0494';

        const client = new Client()
          .setEndpoint(endpoint)
          .setProject(projectId)
          .setJWT(bearerToken);

        const account = new Account(client);
        const appwriteUser = await account.get();

        if (!appwriteUser || !appwriteUser.$id) {
          return res.status(401).json({ success: false, message: 'Invalid or expired Appwrite session' });
        }

        // 3. User Linking and Synchronization
        // First: find by appwriteId
        let user = await User.findOne({ appwriteId: appwriteUser.$id });

        // If not found by appwriteId: check matching email
        if (!user && appwriteUser.email) {
          user = await User.findOne({ email: appwriteUser.email.toLowerCase() });
          if (user) {
            // Associate Appwrite ID with existing user without overwriting other profile data
            user.appwriteId = appwriteUser.$id;
            await user.save();
          }
        }

        // If no matching user exists: safely create the MongoDB User record
        if (!user) {
          user = await User.create({
            appwriteId: appwriteUser.$id,
            name: appwriteUser.name || 'Captain',
            email: appwriteUser.email ? appwriteUser.email.toLowerCase() : `${appwriteUser.$id}@grandline.local`,
            role: 'user',
          });
        }

        req.user = user;
        return next();
      } catch (appwriteErr) {
        console.error('Appwrite JWT verification failed:', appwriteErr.message);
        return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
      }
    }

    // 4. Fallback: Legacy JWT Cookie (supports seamless transition and existing tests)
    let legacyToken = null;
    if (req.cookies && req.cookies.jwt) {
      legacyToken = req.cookies.jwt;
    }

    if (legacyToken && process.env.JWT_SECRET) {
      try {
        const decoded = jwt.verify(legacyToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-passwordHash');
        if (req.user) {
          return next();
        }
      } catch (_legacyErr) {
        // Fall through to 401
      }
    }

    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};
