import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const ReportsPage = () => {
  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', revenue: 4000, users: 2400, sessions: 2400 },
    { month: 'Feb', revenue: 3000, users: 1398, sessions: 2210 },
    { month: 'Mar', revenue: 2000, users: 9800, sessions: 2290 },
    { month: 'Apr', revenue: 2780, users: 3908, sessions: 2000 },
    { month: 'May', revenue: 1890, users: 4800, sessions: 2181 },
    { month: 'Jun', revenue: 2390, users: 3800, sessions: 2500 }
  ];

  const categoryData = [
    { category: 'Electronics', value: 35, color: '#2196F3' },
    { category: 'Clothing', value: 25, color: '#4CAF50' },
    { category: 'Food', value: 20, color: '#FF9800' },
    { category: 'Books', value: 15, color: '#9C27B0' },
    { category: 'Other', value: 5, color: '#607D8B' }
  ];

  const performanceData = [
    { day: 'Mon', performance: 65, target: 70 },
    { day: 'Tue', performance: 78, target: 70 },
    { day: 'Wed', performance: 82, target: 70 },
    { day: 'Thu', performance: 71, target: 70 },
    { day: 'Fri', performance: 89, target: 70 },
    { day: 'Sat', performance: 95, target: 70 },
    { day: 'Sun', performance: 88, target: 70 }
  ];

  const reportDetails = [
    { id: 1, reportName: 'Monthly Revenue', date: '2024-01-31', status: 'Completed', views: 145 },
    { id: 2, reportName: 'User Analytics', date: '2024-01-30', status: 'In Progress', views: 89 },
    { id: 3, reportName: 'Sales Performance', date: '2024-01-29', status: 'Completed', views: 234 },
    { id: 4, reportName: 'Customer Feedback', date: '2024-01-28', status: 'Pending', views: 67 }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="primary">
                24
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Total Reports
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="success.main">
                18
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="warning.main">
                4
              </Typography>
              <Typography variant="h6" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="error.main">
                2
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue & Users Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#2196F3" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="#4CAF50" strokeWidth={2} />
                <Line type="monotone" dataKey="sessions" stroke="#FF9800" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Category Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, justifyContent: 'center' }}>
              {categoryData.map((entry) => (
                <Box key={entry.category} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, backgroundColor: entry.color }} />
                  <Typography variant="caption">{entry.category}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance vs Target
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="performance" stackId="1" stroke="#4CAF50" fill="#4CAF50" />
                <Area type="monotone" dataKey="target" stackId="2" stroke="#FF9800" fill="#FF9800" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Reports Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Reports
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Report Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Views</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportDetails.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.reportName}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        backgroundColor:
                          report.status === 'Completed'
                            ? '#e8f5e8'
                            : report.status === 'In Progress'
                            ? '#fff3cd'
                            : '#f8d7da',
                        color:
                          report.status === 'Completed'
                            ? '#2e7d32'
                            : report.status === 'In Progress'
                            ? '#f57c00'
                            : '#d32f2f'
                      }}
                    >
                      {report.status}
                    </Box>
                  </TableCell>
                  <TableCell>{report.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ReportsPage;
