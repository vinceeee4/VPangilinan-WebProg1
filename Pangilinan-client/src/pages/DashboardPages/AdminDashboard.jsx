import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';

const panelSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)'
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const lineChartWidth = isMobile ? 320 : isTablet ? 560 : 760;
  const pieChartWidth = isMobile ? 280 : 340;

  // Sample statistics
  const stats = [
    { label: 'Total Users', value: 6, icon: <GroupsIcon />, color: '#1d4ed8' },
    { label: 'Active Users', value: 4, icon: <TrendingUpIcon />, color: '#15803d' },
    { label: 'Total Reports', value: 45, icon: <AssignmentIcon />, color: '#c2410c' },
    { label: 'Active Reports', value: 32, icon: <TrendingUpIcon />, color: '#0f766e' }
  ];

  // Sample data for charts
  const monthlyUsers = [12, 19, 8, 15, 22, 18, 25, 30, 28, 35, 32, 38];
  const roleDistribution = [
    { label: 'Admin', value: 1 },
    { label: 'Editor', value: 2 },
    { label: 'Viewer', value: 3 }
  ];

  const genderData = [4, 2]; // Female, Male
  const raceLocations = [
    { name: 'Monaco Grand Prix', country: 'Monaco', position: [43.7347, 7.4206] },
    { name: 'Silverstone Circuit', country: 'United Kingdom', position: [52.0786, -1.0169] },
    { name: 'Suzuka Circuit', country: 'Japan', position: [34.8431, 136.5410] },
    { name: 'Marina Bay Street Circuit', country: 'Singapore', position: [1.2914, 103.8640] }
  ];

  return (
    <Box sx={{ mx: 'auto', maxWidth: 1280 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 0.75, color: '#111827' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Welcome back, {currentUser?.firstName || 'Admin'}. Monitor users, reports, and race coverage.
          </Typography>
        </Box>
        <Chip
          label="Live operations"
          sx={{
            borderRadius: 1.5,
            bgcolor: '#fee2e2',
            color: '#991b1b',
            fontWeight: 700
          }}
        />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card sx={{ ...panelSx, height: '100%' }}>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${stat.color}14`,
                      color: stat.color,
                      '& svg': { fontSize: 28 }
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 800, lineHeight: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ ...panelSx, p: 3, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                User Registration Trends
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Last 12 months
              </Typography>
            </Stack>
            <Box sx={{ overflowX: 'auto' }}>
            <LineChart
              width={lineChartWidth}
              height={300}
              series={[
                { data: monthlyUsers, label: 'Monthly Users' }
              ]}
              xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }]}
            />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ ...panelSx, p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Role Distribution
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
            <PieChart
              series={[
                {
                  data: roleDistribution,
                  innerRadius: 60,
                  outerRadius: 100,
                }
              ]}
              width={pieChartWidth}
              height={300}
            />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ ...panelSx, mt: 3, p: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Quick Actions
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Jump into the main admin workflows.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/dashboard/users')}
            sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 700 }}
          >
            Manage Users
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/dashboard/reports')}
            sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 700 }}
          >
            View Reports
          </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Map */}
      <Paper sx={{ ...panelSx, mt: 3, p: 3, overflow: 'hidden' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Race Locations Map
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Key circuits currently highlighted in the dashboard.
            </Typography>
          </Box>
          <Chip label={`${raceLocations.length} locations`} variant="outlined" sx={{ borderRadius: 1.5 }} />
        </Stack>
        <Box
          sx={{
            height: { xs: 320, md: 420 },
            overflow: 'hidden',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: '#f8fafc',
            '& .leaflet-container': {
              height: '100%',
              width: '100%',
              fontFamily: 'inherit'
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
                  color: '#d32f2f',
                  fillColor: '#d32f2f',
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
      </Paper>
    </Box>
  );
}
