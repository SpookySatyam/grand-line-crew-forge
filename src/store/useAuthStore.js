import { create } from 'zustand';
import { apiFetch } from '../lib/api';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      set({ user: data.user, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  signup: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const data = await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      set({ user: data.user, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    } finally {
      set({ user: null });
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true, error: null });
      const data = await apiFetch('/auth/me');
      set({ user: data.user, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  },
}));

// Listen for 401s to force logout
window.addEventListener('auth:unauthorized', () => {
  useAuthStore.setState({ user: null });
});
