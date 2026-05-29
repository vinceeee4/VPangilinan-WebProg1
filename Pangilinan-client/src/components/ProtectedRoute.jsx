import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children, roles, allowedRoles }) => {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const permittedRoles = allowedRoles || roles || [];

  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }

  if (permittedRoles.length && !permittedRoles.includes(currentUser?.type)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
