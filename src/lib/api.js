import toast from 'react-hot-toast';

export const apiFetch = async (endpoint, options = {}) => {
  const baseUrl = import.meta.env.VITE_API_URL || '';
  const url = `${baseUrl}/api${endpoint}`;

  const fetchOptions = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, fetchOptions);
  
  if (response.status === 401) {
    // Dispatch event so the auth store can log out
    window.dispatchEvent(new Event('auth:unauthorized'));
  }

  let data;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : {};
  } catch (err) {
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
