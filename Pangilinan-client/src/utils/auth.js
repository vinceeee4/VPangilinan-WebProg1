import usersData from '../assets/users.json';

export const authenticateUser = (email, password) => {
  const user = usersData.find(user => user.email === email && user.password === password);
  return user || null;
};

export const getRoleBasedRedirect = (role) => {
  switch (role.toLowerCase()) {
    case 'admin':
      return '/dashboard';
    case 'viewer':
      return '/dashboard';
    case 'editor':
      return '/dashboard';
    default:
      return '/';
  }
};

export const isAuthenticated = () => {
  const user = localStorage.getItem('currentUser');
  return user !== null;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};
