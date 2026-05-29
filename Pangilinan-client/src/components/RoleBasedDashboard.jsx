import React from 'react';
import { getCurrentUser } from '../utils/auth';
import AdminDashboard from '../pages/DashboardPages/AdminDashboard';
import UserDashboard from '../pages/DashboardPages/ViewerDashboard';
import EditorDashboard from '../pages/DashboardPages/EditorDashboard';
import { Navigate } from 'react-router-dom';

const RoleBasedDashboard = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }

  switch (currentUser.type?.toLowerCase()) {
    case 'admin':
      return <AdminDashboard />;
    case 'user':
      return <UserDashboard />;
    case 'editor':
      return <EditorDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default RoleBasedDashboard;
