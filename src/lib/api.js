import toast from 'react-hot-toast';
import { account } from './appwrite';

let cachedJwt = null;
let cachedJwtExpiry = 0;

export const clearCachedToken = () => {
  cachedJwt = null;
  cachedJwtExpiry = 0;
};

const getAppwriteJwt = async () => {
  const now = Date.now();
  // Reuse token if it has at least 60 seconds of validity remaining
  if (cachedJwt && now < cachedJwtExpiry - 60000) {
    return cachedJwt;
  }

  try {
    const response = await account.createJWT();
    if (response && response.jwt) {
      cachedJwt = response.jwt;
      // Appwrite JWTs expire after 15 minutes; cache for 14 minutes
      cachedJwtExpiry = now + 14 * 60 * 1000;
      return cachedJwt;
    }
  } catch (_err) {
    // Not logged in or session expired
    clearCachedToken();
    return null;
  }
  return null;
};

export const apiFetch = async (endpoint, options = {}) => {
  const baseUrl = import.meta.env.VITE_API_URL || '';
  const url = `${baseUrl}/api${endpoint}`;

  const token = await getAppwriteJwt();
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchOptions = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, fetchOptions);
  
  if (response.status === 401) {
    clearCachedToken();
    // Dispatch event so the auth store can log out
    window.dispatchEvent(new Event('auth:unauthorized'));
  }

  let data;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : {};
  } catch (_err) {
    data = { message: 'Failed to parse response' };
  }

  if (!response.ok) {
    const errorMessage = data.message || 'Something went wrong';
    if (response.status !== 401) {
      toast.error(errorMessage);
    }
    throw new Error(errorMessage);
  }

  return data;
};
