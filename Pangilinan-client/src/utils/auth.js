export const getRoleBasedRedirect = (role) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return '/dashboard';
    case 'user':
      return '/dashboard';
    case 'editor':
      return '/dashboard';
    default:
      return '/';
  }
};

export const isAuthenticated = () => {
  return Boolean(getToken() && getCurrentUser());
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  const normalizedUser = user?.type === 'viewer' ? { ...user, type: 'user' } : user;
  localStorage.setItem('currentUser', JSON.stringify(normalizedUser));
};

export const getToken = () => localStorage.getItem('token');

export const setAuthSession = ({ token, user }) => {
  const normalizedUser = user?.type === 'viewer' ? { ...user, type: 'user' } : user;

  localStorage.setItem('token', token);
  localStorage.setItem('firstName', normalizedUser?.firstName || '');
  localStorage.setItem('type', normalizedUser?.type || '');
  setCurrentUser(normalizedUser);
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  localStorage.removeItem('firstName');
  localStorage.removeItem('type');
};
