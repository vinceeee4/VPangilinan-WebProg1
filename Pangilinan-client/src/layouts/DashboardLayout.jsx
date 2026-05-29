import React, { useState } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import { getCurrentUser, logoutUser } from '../utils/auth';

const DRAWER_WIDTH = 280;

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const currentRole = currentUser?.type || 'user';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
      color: '#1976d2',
      roles: ['admin', 'editor', 'user']
    },
    {
      label: 'Articles',
      icon: <ArticleIcon />,
      path: '/dashboard/articles',
      color: '#7b1fa2',
      roles: ['admin', 'editor']
    },
    {
      label: 'Users',
      icon: <GroupsIcon />,
      path: '/dashboard/users',
      color: '#388e3c',
      roles: ['admin']
    },
    {
      label: 'Article Selections',
      icon: <HistoryIcon />,
      path: '/dashboard/article-selections',
      color: '#5d4037',
      roles: ['admin']
    },
    {
      label: 'Reports',
      icon: <AssignmentIcon />,
      path: '/dashboard/reports',
      color: '#f57c00',
      roles: ['admin', 'editor', 'user']
    }
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/auth/signin', { replace: true });
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Drawer Header */}
      <Box
        sx={{
          p: 2.5,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DashboardIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Dashboard
          </Typography>
        </Box>
        {/* Close button for mobile */}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: 'white', display: { xs: 'flex', sm: 'none' } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, pt: 2, px: 1 }}>
        {menuItems.filter((item) => item.roles.includes(currentRole)).map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
            onClick={() => setMobileOpen(false)}
            sx={{
              mb: 1,
              borderRadius: 1.5,
              transition: 'all 0.3s ease',
              '&.Mui-selected': {
                backgroundColor: `${item.color}15`,
                borderLeft: `4px solid ${item.color}`,
                paddingLeft: '16px',
                '& .MuiListItemIcon-root': {
                  color: item.color,
                  fontWeight: 'bold'
                },
                '& .MuiListItemText-primary': {
                  color: item.color,
                  fontWeight: 600
                }
              },
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateX(8px)'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* Footer */}
      <Box sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
        <ListItemButton
          component={Link}
          to="/"
          sx={{
            borderRadius: 1,
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: '#e0e0e0'
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <HomeIcon sx={{ color: '#666' }} />
          </ListItemIcon>
          <ListItemText
            primary="Back to Home"
            primaryTypographyProps={{ fontSize: '0.9rem' }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          backgroundColor: 'white',
          color: '#333',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1100
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Dashboard
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Welcome, {currentUser?.firstName || 'User'} ({currentRole})
            </Typography>
            <Button
              size="small"
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer - Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e0e0e0'
          },
          display: { xs: 'none', sm: 'block' }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer - Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: '#ffffff'
          }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` }
        }}
      >
        {/* Toolbar spacing */}
        <Toolbar />

        {/* Page Content */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, width: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
