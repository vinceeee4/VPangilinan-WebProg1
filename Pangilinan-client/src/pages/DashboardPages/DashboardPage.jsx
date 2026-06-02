import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
  Button
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
  const raceLocations = [
    { name: 'Monaco Grand Prix', country: 'Monaco', position: [43.7347, 7.4206] },
    { name: 'Silverstone Circuit', country: 'United Kingdom', position: [52.0786, -1.0169] },
    { name: 'Suzuka Circuit', country: 'Japan', position: [34.8431, 136.5410] },
    { name: 'Marina Bay Street Circuit', country: 'Singapore', position: [1.2914, 103.8640] }
  ];

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

      {/* Leaflet Map */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Race Locations Map
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Key Formula 1 circuits shown with interactive map markers
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                px: 1.5,
                py: 0.75,
                borderRadius: 1,
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                fontWeight: 'bold'
              }}
            >
              {raceLocations.length} locations
            </Typography>
          </Stack>
          <Box
            sx={{
              height: { xs: 320, md: 420 },
              overflow: 'hidden',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              '& .leaflet-container': {
                height: '100%',
                width: '100%'
              }
            }}
          >
            <MapContainer center={[24, 35]} zoom={2} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {raceLocations.map((location) => (
                <CircleMarker
                  key={location.name}
                  center={location.position}
                  radius={8}
                  pathOptions={{
                    color: '#1976d2',
                    fillColor: '#1976d2',
                    fillOpacity: 0.85
                  }}
                >
                  <Popup>
                    <strong>{location.name}</strong>
                    <br />
                    {location.country}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
