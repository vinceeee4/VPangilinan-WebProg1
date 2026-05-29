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
  Button
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  // Sample statistics
  const stats = {
    totalUsers: 125,
    activeUsers: 98,
    totalReports: 45,
    activeReports: 32
  };

  // Sample data for charts
  const monthlyUsers = [12, 19, 8, 15, 22, 18, 25, 30, 28, 35, 32, 38];
  const roleDistribution = [
    { label: 'User', value: 75 },
    { label: 'Admin', value: 30 },
    { label: 'Editor', value: 20 }
  ];

  const genderData = [65, 60];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Monitor system statistics and manage users
        </Typography>
      </Box>

      {/* Key Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <GroupsIcon sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Total Users
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {stats.totalUsers}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <TrendingUpIcon sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Active Users
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {stats.activeUsers}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <AssignmentIcon sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Total Reports
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {stats.totalReports}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <AssignmentIcon sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Active Reports
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {stats.activeReports}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Monthly User Growth
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                <LineChart
                  series={[
                    {
                      data: monthlyUsers,
                      label: 'New Users',
                      showMark: true
                    }
                  ]}
                  xAxis={[
                    {
                      scaleType: 'point',
                      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    }
                  ]}
                  width={600}
                  height={350}
                  margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Role Distribution
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: roleDistribution,
                      innerRadius: 30,
                      outerRadius: 100
                    }
                  ]}
                  width={320}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Gender Distribution
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                <BarChart
                  series={[
                    {
                      data: genderData,
                      label: 'Users'
                    }
                  ]}
                  categories={['Male', 'Female']}
                  width={400}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#1976d2' }}
                  onClick={() => navigate('/dashboard/users')}
                >
                  Manage Users
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#388e3c' }}
                  onClick={() => navigate('/dashboard/reports')}
                >
                  View Reports
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ color: '#1976d2', borderColor: '#1976d2' }}
                >
                  Export Data
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            System Overview
          </Typography>
          <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">System Status</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    px: 2,
                    py: 0.5,
                    backgroundColor: '#4caf50',
                    color: 'white',
                    borderRadius: 1
                  }}
                >
                  Operational
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Last Updated</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {new Date().toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Uptime</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  99.8%
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Server Response Time</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  45ms
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}
