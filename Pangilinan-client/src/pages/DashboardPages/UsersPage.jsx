import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { createUser, deleteUser, fetchUsers, updateUser } from '../../services/UserService';
import { validations } from '../../utils/validations';

const roles = ['admin', 'editor', 'user'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: 'male',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
  type: 'user',
  isActive: true
};

const labelize = (value) => value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(blankForm);
  const [formError, setFormError] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      setApiError('');
      const { data } = await fetchUsers();
      setUsers((Array.isArray(data) ? data : []).map((user) => ({ ...user, id: user._id })));
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const search = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = !search || [
        user.firstName,
        user.lastName,
        user.email,
        user.username
      ].join(' ').toLowerCase().includes(search);
      const matchesRole = !roleFilter || user.type === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, query, roleFilter]);

  const openDialog = (user) => {
    setEditingId(user?._id || null);
    setFormData(user ? { ...user, password: '' } : blankForm);
    setFormError('');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setFormData(blankForm);
    setFormError('');
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const checks = [
      validations.validateFirstName(formData.firstName),
      validations.validateLastName(formData.lastName),
      validations.validateAge(formData.age),
      validations.validateContactNumber(formData.contactNumber),
      validations.validateEmail(formData.email),
      validations.validateUsername(formData.username)
    ];

    if (!editingId) checks.push(validations.validatePassword(formData.password));
    if (formData.password) checks.push(validations.validatePassword(formData.password));
    if (!formData.address.trim()) checks.push('Address is required');

    return checks.find(Boolean) || '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateForm();

    if (error) {
      setFormError(error);
      return;
    }

    try {
      const payload = { ...formData };
      if (editingId && !payload.password) delete payload.password;

      if (editingId) {
        await updateUser(editingId, payload);
      } else {
        await createUser(payload);
      }

      await loadUsers();
      closeDialog();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Unable to save user.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;

    try {
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Unable to delete user.');
    }
  };

  const handleToggleActive = async (user) => {
    try {
      await updateUser(user._id, { isActive: !user.isActive });
      await loadUsers();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Unable to update user status.');
    }
  };

  const columns = [
    { field: 'firstName', headerName: 'First Name', minWidth: 140, flex: 1 },
    { field: 'lastName', headerName: 'Last Name', minWidth: 140, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 220, flex: 1.2 },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    {
      field: 'type',
      headerName: 'Role',
      minWidth: 110,
      renderCell: ({ row }) => <Chip size="small" label={labelize(row.type)} />
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip size="small" color={row.isActive ? 'success' : 'default'} label={row.isActive ? 'Active' : 'Inactive'} />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 280,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openDialog(row)}>Edit</Button>
          <Button size="small" variant="contained" color={row.isActive ? 'warning' : 'success'} onClick={() => handleToggleActive(row)}>
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
          <IconButton size="small" color="error" onClick={() => handleDelete(row._id)} aria-label="delete user">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems={{ sm: 'center' }} justifyContent="space-between">
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Users Management</Typography>
          <Typography variant="body2" color="text.secondary">Admin-only user and role management.</Typography>
        </Box>
        <Button variant="contained" onClick={() => openDialog()}>Add User</Button>
      </Stack>

      {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
            }}
            sx={{ flex: 1 }}
          />
          <TextField select size="small" label="Role" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} sx={{ minWidth: 160 }}>
            <MenuItem value="">All Roles</MenuItem>
            {roles.map((role) => <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>)}
          </TextField>
        </Stack>
      </Paper>

      <Paper sx={{ height: 540, width: '100%', p: 1 }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      </Paper>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{editingId ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers>
            {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} fullWidth />
                <TextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField name="age" label="Age" value={formData.age} onChange={handleChange} fullWidth />
                <TextField name="gender" label="Gender" value={formData.gender} onChange={handleChange} select fullWidth>
                  {genders.map((gender) => <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>)}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth />
                <TextField name="contactNumber" label="Contact Number" value={formData.contactNumber} onChange={handleChange} fullWidth />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField name="username" label="Username" value={formData.username} onChange={handleChange} fullWidth />
                <TextField name="type" label="Role" value={formData.type} onChange={handleChange} select fullWidth>
                  {roles.map((role) => <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>)}
                </TextField>
              </Stack>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                helperText={editingId ? 'Leave blank to keep current password.' : 'At least 8 characters.'}
                fullWidth
              />
              <TextField name="address" label="Address" value={formData.address} onChange={handleChange} multiline minRows={2} fullWidth />
              <FormControlLabel
                control={<Switch name="isActive" checked={Boolean(formData.isActive)} onChange={handleChange} />}
                label={formData.isActive ? 'Active account' : 'Inactive account'}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" variant="contained">{editingId ? 'Save Changes' : 'Add User'}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
