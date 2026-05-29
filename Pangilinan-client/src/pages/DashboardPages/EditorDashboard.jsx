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
  ListItemIcon,
  Chip
} from '@mui/material';
import { Edit, Description, Publish, Drafts, Schedule } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';

export default function EditorDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Sample data for editor
  const myReports = [
    { id: 1, title: 'Q4 Financial Report', date: '2024-01-15', status: 'Published', views: 145 },
    { id: 2, title: 'User Engagement Analysis', date: '2024-01-14', status: 'Draft', views: 0 },
    { id: 3, title: 'System Performance Review', date: '2024-01-13', status: 'In Review', views: 23 }
  ];

  const stats = {
    totalReports: 12,
    publishedReports: 8,
    draftReports: 3,
    reviewReports: 1,
    totalViews: 1250
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'success';
      case 'Draft': return 'default';
      case 'In Review': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Editor Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Welcome back, {currentUser?.firstName}! Create and manage your reports
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Description sx={{ fontSize: 40, color: 'primary.main' }} />
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
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Publish sx={{ fontSize: 40, color: 'success.main' }} />
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
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Drafts sx={{ fontSize: 40, color: 'warning.main' }} />
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
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Schedule sx={{ fontSize: 40, color: 'info.main' }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.reviewReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Review
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Edit sx={{ fontSize: 40, color: 'secondary.main' }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalViews}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Views
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* My Reports */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              My Reports
            </Typography>
            <List>
              {myReports.map((report) => (
                <ListItem key={report.id} divider>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText
                    primary={report.title}
                    secondary={`Date: ${report.date} | Views: ${report.views}`}
                  />
                  <Chip 
                    label={report.status} 
                    color={getStatusColor(report.status)} 
                    size="small" 
                    sx={{ mr: 1 }}
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => navigate(`/reports/${report.id}/edit`)}
                  >
                    Edit
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
                onClick={() => navigate('/reports/new')}
              >
                Create New Report
              </Button>
              <Button 
                variant="outlined" 
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
