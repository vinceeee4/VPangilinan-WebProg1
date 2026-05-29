import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles, roles }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  const user = getCurrentUser();
  const permittedRoles = roles || allowedRoles;

  if (permittedRoles && user && !permittedRoles.includes(user.type)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
