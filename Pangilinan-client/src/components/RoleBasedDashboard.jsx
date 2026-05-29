import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Button from './Button';
import { getCurrentUser } from '../utils/auth';

const buttonConfig = [
  {
    title: 'Overview',
    description: 'View a quick summary of active users and system health.',
    path: '/dashboard',
    roles: ['admin', 'editor', 'user'],
    colorClass: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    title: 'Articles',
    description: 'Manage or review articles in the system.',
    path: '/dashboard/articles',
    roles: ['admin', 'editor'],
    colorClass: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    title: 'Users',
    description: 'Create, update, or remove application users.',
    path: '/dashboard/users',
    roles: ['admin'],
    colorClass: 'bg-green-600 hover:bg-green-700'
  },
  {
    title: 'Article Selections',
    description: 'Review article selections and access history.',
    path: '/dashboard/article-selections',
    roles: ['admin'],
    colorClass: 'bg-amber-600 hover:bg-amber-700'
  },
  {
    title: 'Reports',
    description: 'Browse performance dashboards and reports.',
    path: '/dashboard/reports',
    roles: ['admin', 'editor', 'user'],
    colorClass: 'bg-red-600 hover:bg-red-700'
  }
];

const RoleBasedDashboard = () => {
  const currentUser = getCurrentUser();
  const currentRole = currentUser?.type || 'user';

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Welcome back, {currentUser?.firstName || 'User'}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Access the tools and reports available to your role.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {buttonConfig
          .filter((item) => item.roles.includes(currentRole))
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.path}>
              <Card sx={{ minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: 1.2, mb: 1, color: 'text.secondary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </CardContent>

                <Box sx={{ p: 2 }}>
                  <Button to={item.path} variant="primary" className={`${item.colorClass} w-full`}>
                    Open
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default RoleBasedDashboard;
