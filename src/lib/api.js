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
  } catch (err) {
    if (err?.code === 501 || err?.type === 'user_auth_method_unsupported') {
      console.warn('Appwrite JWT authentication is disabled in your Appwrite project console. Please enable JWT under Auth -> Security/Settings in Appwrite Console.');
    }
    clearCachedToken();
    return null;
  }
  return null;
};

export const apiFetch = async (endpoint, options = {}) => {
  let baseUrl = import.meta.env.VITE_API_URL || '';
  // Remove trailing slash if present
  if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
  // Ensure we don't duplicate /api if the env variable already includes it
  const basePath = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
  const url = `${basePath}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

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
  
  if (response.status === 401 && token) {
    clearCachedToken();
    // Dispatch event so the auth store can verify session and log out if expired
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
