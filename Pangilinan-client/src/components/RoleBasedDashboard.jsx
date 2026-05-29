import React from 'react';
import { getCurrentUser } from '../utils/auth';
import AdminDashboard from '../pages/DashboardPages/AdminDashboard';
import ViewerDashboard from '../pages/DashboardPages/ViewerDashboard';
import EditorDashboard from '../pages/DashboardPages/EditorDashboard';
import { Navigate } from 'react-router-dom';

const RoleBasedDashboard = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }

  switch (currentUser.role.toLowerCase()) {
    case 'admin':
      return <AdminDashboard />;
    case 'viewer':
      return <ViewerDashboard />;
    case 'editor':
      return <EditorDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default RoleBasedDashboard;
