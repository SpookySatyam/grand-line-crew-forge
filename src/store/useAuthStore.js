import { create } from 'zustand';
import { account, ID } from '../lib/appwrite';
import { clearCachedToken } from '../lib/api';

export const formatAuthError = (err, context = 'general') => {
  if (!err) return 'An unexpected error occurred. Please try again.';
  
  const message = (err.message || '').toLowerCase();
  const type = (err.type || '').toLowerCase();
  const code = err.code || err.status;

  // Network / Connection
  if (message.includes('network') || message.includes('failed to fetch') || code === 0) {
    return 'Unable to connect to the Grand Line network. Please check your internet connection.';
  }

  // Account already exists
  if (
    type === 'user_already_exists' || 
    code === 409 || 
    message.includes('already exists') || 
    message.includes('duplicate')
  ) {
    return 'An account with this email address already exists. Try setting sail by logging in.';
  }

  // Invalid credentials
  if (
    type === 'user_invalid_credentials' || 
    (code === 401 && context === 'login') ||
    message.includes('invalid credentials') || 
    message.includes('invalid email or password')
  ) {
    return 'Incorrect email or password. Check your credentials and try again.';
  }

  // Invalid email format
  if (
    type === 'user_email_invalid' || 
    type === 'general_argument_invalid' ||
    message.includes('valid email') || 
    message.includes('email format')
  ) {
    return 'Please enter a valid email address.';
  }

  // Weak password / Password constraints
  if (
    type.includes('password') || 
    message.includes('password must be') || 
    message.includes('password is too short') ||
    message.includes('at least 8 characters')
  ) {
    return 'Password must be at least 8 characters long.';
  }

  // Verification errors
  if (context === 'verification' && (
    code === 401 || code === 400 || 
    type.includes('token') || 
    type.includes('confirmation') || 
    message.includes('expired') || 
    message.includes('invalid')
  )) {
    return 'This verification link has expired or is invalid. Please request a new verification email.';
  }

  // Password recovery errors
  if (context === 'recovery' && (
    code === 401 || code === 400 || 
    type.includes('token') || 
    type.includes('recovery') || 
    message.includes('expired') || 
    message.includes('invalid')
  )) {
    return 'This password recovery link has expired or is invalid. Please request a new reset link.';
  }

  // Rate limiting
  if (code === 429 || type === 'general_rate_limit_exceeded' || message.includes('rate limit')) {
    return 'Too many attempts. Please pause your voyage and try again in a few minutes.';
  }

  // Clean fallback message
  if (err.message && err.message.length < 120 && !err.message.includes('http') && !err.message.includes('{')) {
    return err.message;
  }

  return 'A voyage mishap occurred. Please try again.';
};

const formatUser = (acc) => {
  if (!acc) return null;
  return {
    id: acc.$id,
    $id: acc.$id,
    name: acc.name || 'Captain',
    email: acc.email,
    emailVerification: true,
  };
};

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      // Clean up any stale active sessions
      try {
        await account.deleteSession('current');
      } catch (_) {
        // No active session
      }

      await account.createEmailPasswordSession(email, password);
      const acc = await account.get();
      const user = formatUser(acc);
      clearCachedToken();
      set({ user, loading: false, error: null });
      return user;
    } catch (err) {
      const formattedError = formatAuthError(err, 'login');
      set({ error: formattedError, loading: false });
      throw new Error(formattedError);
    }
  },

  signup: async (name, email, password) => {
    try {
      set({ loading: true, error: null });

      // 1. Create account in Appwrite
      await account.create(ID.unique(), email, password, name);

      // 2. Clear any lingering session & start fresh session
      try {
        await account.deleteSession('current');
      } catch (_) {
        // No active session
      }
      await account.createEmailPasswordSession(email, password);

      // 3. Dispatch verification email (Disabled)

      // 4. Fetch current user
      const acc = await account.get();
      const user = formatUser(acc);
      clearCachedToken();
      set({ user, loading: false, error: null });
      return user;
    } catch (err) {
      const formattedError = formatAuthError(err, 'signup');
      set({ error: formattedError, loading: false });
      throw new Error(formattedError);
    }
  },

  logout: async () => {
    try {
      await account.deleteSession('current');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearCachedToken();
      set({ user: null, error: null });
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true, error: null });
      const acc = await account.get();
      const user = formatUser(acc);
      set({ user, loading: false });
      return user;
    } catch (err) {
      clearCachedToken();
      set({ user: null, loading: false });
      return null;
    }
  },

  sendVerificationEmail: async () => {
    try {
      const verifyUrl = `${window.location.origin}/verify-email`;
      await account.createVerification(verifyUrl);
      return true;
    } catch (err) {
      const formattedError = formatAuthError(err, 'verification');
      throw new Error(formattedError);
    }
  },

  verifyEmail: async (userId, secret) => {
    try {
      await account.updateVerification(userId, secret);
      const acc = await account.get();
      const user = formatUser(acc);
      set({ user, error: null });
      return user;
    } catch (err) {
      const formattedError = formatAuthError(err, 'verification');
      throw new Error(formattedError);
    }
  },

  sendPasswordRecovery: async (email) => {
    try {
      const resetUrl = `${window.location.origin}/reset-password`;
      await account.createRecovery(email, resetUrl);
      return true;
    } catch (err) {
      const formattedError = formatAuthError(err, 'recovery');
      throw new Error(formattedError);
    }
  },

  resetPassword: async (userId, secret, password) => {
    try {
      await account.updateRecovery(userId, secret, password);
      return true;
    } catch (err) {
      const formattedError = formatAuthError(err, 'recovery');
      throw new Error(formattedError);
    }
  },
}));

// Listen for 401s to force logout
window.addEventListener('auth:unauthorized', () => {
  clearCachedToken();
  useAuthStore.setState({ user: null });
});
