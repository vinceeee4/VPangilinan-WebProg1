const AUTH_TOKEN_KEY = 'authToken';
const AUTH_USER_KEY = 'authUser';

export const getApiBaseUrl = () =>
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(AUTH_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to parse current user from localStorage', error);
    return null;
  }
};

export const setAuthSession = ({ token, user }) => {
  if (typeof window === 'undefined') return;

  if (!token || !user) {
    logoutUser();
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const logoutUser = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
};

export const isAuthenticated = () => {
  return Boolean(getAuthToken() && getCurrentUser());
};

export const getRoleBasedRedirect = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'editor':
      return '/dashboard/articles';
    default:
      return '/dashboard/reports';
  }
};
