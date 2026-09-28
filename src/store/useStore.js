import { create } from 'zustand';
import { apiFetch } from '../lib/api';

export const useStore = create((set, get) => ({
  participants: [],
  crews: [],
  challenges: [],
  dashboardStats: null,
  loading: false,
  error: null,

  fetchRecruits: async () => {
    try {
      set({ loading: true, error: null });
      const data = await apiFetch('/recruits');
      set({ participants: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addParticipant: async (participant) => {
    try {
      const data = await apiFetch('/recruits', {
        method: 'POST',
        body: JSON.stringify(participant),
      });
      set((state) => ({ participants: [data.data, ...state.participants] }));
    } catch (error) {
      throw error;
    }
  },

  updateParticipant: async (id, payload) => {
    try {
      const data = await apiFetch(`/recruits/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      set((state) => ({
        participants: state.participants.map(p => p._id === id ? data.data : p)
      }));
    } catch (error) {
      throw error;
    }
  },

  deleteParticipant: async (id) => {
    try {
      await apiFetch(`/recruits/${id}`, {
        method: 'DELETE',
      });
      set((state) => ({
        participants: state.participants.filter(p => p._id !== id)
      }));
    } catch (error) {
      throw error;
    }
  },

  fetchDashboardStats: async () => {
    try {
      const data = await apiFetch('/dashboard/stats');
      set({ dashboardStats: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  fetchCrews: async () => {
    try {
      const data = await apiFetch('/crews');
      set({ crews: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  fetchChallenges: async () => {
    try {
      const data = await apiFetch('/challenges');
      set({ challenges: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  addChallenge: async (challenge) => {
    try {
      const data = await apiFetch('/challenges', {
        method: 'POST',
        body: JSON.stringify(challenge),
      });
      set((state) => ({ challenges: [data.data, ...state.challenges] }));
    } catch (error) {
      throw error;
    }
  },

  formCrews: async (teamSize) => {
    try {
      const data = await apiFetch('/crews/form', {
        method: 'POST',
        body: JSON.stringify({ teamSize })
      });
      console.log('formCrews response:', data); // the user asked to see on console
      set({ crews: data.data });
    } catch (error) {
      console.error('formCrews error:', error);
      throw error;
    }
  },

  assignChallenges: async () => {
    try {
      const data = await apiFetch('/crews/assign-challenges', {
        method: 'POST'
      });
      console.log('assignChallenges response:', data);
      set({ crews: data.data });
    } catch (error) {
      console.error('assignChallenges error:', error);
      throw error;
    }
  }
}));
