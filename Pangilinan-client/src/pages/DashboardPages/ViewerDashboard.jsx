import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';

export default function UserDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Sample data for user
  const recentReports = [
    { id: 1, title: 'Monthly Sales Report', date: '2024-01-15', status: 'Published' },
    { id: 2, title: 'User Activity Analysis', date: '2024-01-14', status: 'Published' },
    { id: 3, title: 'Performance Metrics', date: '2024-01-13', status: 'Draft' }
  ];

  const stats = {
    totalReports: 24,
    publishedReports: 18,
    draftReports: 6,
    lastLogin: '2 hours ago'
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          User Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Welcome back, {currentUser?.firstName}! View reports and analytics
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Reports
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <VisibilityIcon sx={{ fontSize: 40, color: 'success.main' }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.publishedReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Published
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <DescriptionIcon sx={{ fontSize: 40, color: 'warning.main' }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.draftReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Drafts
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AccessTimeIcon sx={{ fontSize: 40, color: 'info.main' }} />
                <Box>
                  <Typography variant="body2" component="div">
                    {stats.lastLogin}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last Login
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Reports */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Reports
            </Typography>
            <List>
              {recentReports.map((report) => (
                <ListItem key={report.id} divider>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={report.title}
                    secondary={`Date: ${report.date} | Status: ${report.status}`}
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => navigate(`/reports/${report.id}`)}
                  >
                    View
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => navigate('/dashboard/reports')}
              >
                View All Reports
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => navigate('/dashboard/analytics')}
              >
                Analytics
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
