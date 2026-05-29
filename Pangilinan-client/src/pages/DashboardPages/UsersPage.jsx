import React, { useState } from 'react';
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
  TableRow,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample user data
  const usersData = [
    { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Doe', 
      email: 'john.doe@example.com', 
      age: 25, 
      role: 'Admin',
      status: 'Active',
      avatar: 'JD'
    },
    { 
      id: 2, 
      firstName: 'Jane', 
      lastName: 'Smith', 
      email: 'jane.smith@example.com', 
      age: 30, 
      role: 'User',
      status: 'Active',
      avatar: 'JS'
    },
    { 
      id: 3, 
      firstName: 'Bob', 
      lastName: 'Johnson', 
      email: 'bob.johnson@example.com', 
      age: 35, 
      role: 'Editor',
      status: 'Active',
      avatar: 'BJ'
    },
    { 
      id: 4, 
      firstName: 'Alice', 
      lastName: 'Brown', 
      email: 'alice.brown@example.com', 
      age: 28, 
      role: 'User',
      status: 'Inactive',
      avatar: 'AB'
    },
    { 
      id: 5, 
      firstName: 'Charlie', 
      lastName: 'Wilson', 
      email: 'charlie.wilson@example.com', 
      age: 42, 
      role: 'Viewer',
      status: 'Active',
      avatar: 'CW'
    },
    { 
      id: 6, 
      firstName: 'Diana', 
      lastName: 'Martinez', 
      email: 'diana.martinez@example.com', 
      age: 29, 
      role: 'Editor',
      status: 'Active',
      avatar: 'DM'
    },
    { 
      id: 7, 
      firstName: 'Edward', 
      lastName: 'Davis', 
      email: 'edward.davis@example.com', 
      age: 31, 
      role: 'User',
      status: 'Active',
      avatar: 'ED'
    },
    { 
      id: 8, 
      firstName: 'Fiona', 
      lastName: 'Garcia', 
      email: 'fiona.garcia@example.com', 
      age: 26, 
      role: 'Viewer',
      status: 'Inactive',
      avatar: 'FG'
    },
    { 
      id: 9, 
      firstName: 'George', 
      lastName: 'Miller', 
      email: 'george.miller@example.com', 
      age: 38, 
      role: 'Admin',
      status: 'Active',
      avatar: 'GM'
    }
  ];

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'error';
      case 'Editor': return 'warning';
      case 'User': return 'primary';
      case 'Viewer': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  const filteredUsers = usersData.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsers = usersData.length;
  const activeUsers = usersData.filter(user => user.status === 'Active').length;
  const inactiveUsers = usersData.filter(user => user.status === 'Inactive').length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="primary">
                {totalUsers}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="success.main">
                {activeUsers}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Active Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" color="error.main">
                {inactiveUsers}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Inactive Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { md: 'right' } }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
            >
              Add User
            </Button>
            <Button variant="outlined">
              Export
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Users Table */}
      <Paper sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {user.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {user.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={getRoleColor(user.role)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, user)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ViewIcon sx={{ mr: 1 }} />
          View
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UsersPage;
