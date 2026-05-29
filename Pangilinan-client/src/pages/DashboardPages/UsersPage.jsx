import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// Sample user data
const initialUsers = [
  { id: 1, firstName: 'Snow', lastName: 'Jon', email: 'jon.snow@example.com', username: 'jsnow', age: 14, role: 'User', gender: 'Male', status: 'active', contact: '09123456789' },
  { id: 2, firstName: 'Lannister', lastName: 'Cersei', email: 'cersei@example.com', username: 'cersei123', age: 31, role: 'Admin', gender: 'Female', status: 'active', contact: '09987654321' },
  { id: 3, firstName: 'Lannister', lastName: 'Jaime', email: 'jaime@example.com', username: 'jaime_l', age: 31, role: 'Editor', gender: 'Male', status: 'inactive', contact: '09111111111' },
  { id: 4, firstName: 'Stark', lastName: 'Arya', email: 'arya@example.com', username: 'arya_stark', age: 11, role: 'User', gender: 'Female', status: 'active', contact: '09222222222' },
  { id: 5, firstName: 'Targaryen', lastName: 'Daenerys', email: 'daenerys@example.com', username: 'dany_targaryen', age: 30, role: 'Admin', gender: 'Female', status: 'active', contact: '09333333333' },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    age: '',
    contact: '',
    role: 'User',
    gender: 'Male',
    status: 'active'
  });

  // Handle search and filters
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, filterRole, filterGender, filterStatus);
  };

  const handleRoleFilter = (e) => {
    const role = e.target.value;
    setFilterRole(role);
    applyFilters(searchTerm, role, filterGender, filterStatus);
  };

  const handleGenderFilter = (e) => {
    const gender = e.target.value;
    setFilterGender(gender);
    applyFilters(searchTerm, filterRole, gender, filterStatus);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    applyFilters(searchTerm, filterRole, filterGender, status);
  };

  const applyFilters = (search, role, gender, status) => {
    let filtered = users;

    if (search) {
      filtered = filtered.filter((user) =>
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search)
      );
    }

    if (role) {
      filtered = filtered.filter((user) => user.role === role);
    }

    if (gender) {
      filtered = filtered.filter((user) => user.gender === gender);
    }

    if (status) {
      filtered = filtered.filter((user) => user.status === status);
    }

    setFilteredUsers(filtered);
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add or update user
  const handleSaveUser = () => {
    if (editingId) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === editingId ? { ...user, ...formData } : user
        )
      );
      setSuccessMessage('User updated successfully!');
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData
      };
      setUsers([...users, newUser]);
      setSuccessMessage('User added successfully!');
    }

    setTimeout(() => setSuccessMessage(''), 3000);
    handleCloseDialog();
  };

  // Edit user
  const handleEditUser = (user) => {
    setFormData(user);
    setEditingId(user.id);
    setDialogOpen(true);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== id));
      applyFilters(searchTerm, filterRole, filterGender, filterStatus);
      setSuccessMessage('User deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Open add dialog
  const handleOpenDialog = () => {
    setEditingId(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      age: '',
      contact: '',
      role: 'User',
      gender: 'Male',
      status: 'active'
    });
    setDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      age: '',
      contact: '',
      role: 'User',
      gender: 'Male',
      status: 'active'
    });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Users Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          View, add, edit, and manage all users in the system
        </Typography>
      </Box>

      {/* Success Message */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {/* Add User Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ backgroundColor: '#d32f2f' }}
        >
          Add New User
        </Button>
      </Box>

      {/* Search and Filters Section */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Search & Filter
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or username"
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={filterRole}
                onChange={handleRoleFilter}
                label="Role"
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Gender</InputLabel>
              <Select
                value={filterGender}
                onChange={handleGenderFilter}
                label="Gender"
              >
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={handleStatusFilter}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
          Results: {filteredUsers.length} of {users.length} users
        </Typography>
      </Paper>

      {/* Users Table */}
      <Card>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Age</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.contact}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          backgroundColor: user.status === 'active' ? '#4caf50' : '#f44336',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {user.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEditUser(user)}
                        sx={{ color: '#1976d2' }}
                        title="Edit user"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteUser(user.id)}
                        sx={{ color: '#d32f2f' }}
                        title="Delete user"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white' }}>
          {editingId ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleFormChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleFormChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleFormChange}
            margin="normal"
            placeholder="09XXXXXXXXX"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              label="Role"
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            sx={{ backgroundColor: '#1976d2' }}
          >
            {editingId ? 'Update User' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
