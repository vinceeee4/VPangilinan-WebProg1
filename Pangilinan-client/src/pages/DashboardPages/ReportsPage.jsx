import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Sample data for the reports
const sampleRows = [
  { id: 1, firstName: 'Snow', lastName: 'Jon', email: 'jon.snow@example.com', username: 'jsnow', age: 14, role: 'User', gender: 'Male', status: 'active', contact: '09123456789' },
  { id: 2, firstName: 'Lannister', lastName: 'Cersei', email: 'cersei@example.com', username: 'cersei123', age: 31, role: 'Admin', gender: 'Female', status: 'active', contact: '09987654321' },
  { id: 3, firstName: 'Lannister', lastName: 'Jaime', email: 'jaime@example.com', username: 'jaime_l', age: 31, role: 'Editor', gender: 'Male', status: 'inactive', contact: '09111111111' },
  { id: 4, firstName: 'Stark', lastName: 'Arya', email: 'arya@example.com', username: 'arya_stark', age: 11, role: 'User', gender: 'Female', status: 'active', contact: '09222222222' },
  { id: 5, firstName: 'Targaryen', lastName: 'Daenerys', email: 'daenerys@example.com', username: 'dany_targaryen', age: 30, role: 'Admin', gender: 'Female', status: 'active', contact: '09333333333' },
  { id: 6, firstName: 'Melisandre', lastName: '', email: 'melisandre@example.com', username: 'melisandre_red', age: 150, role: 'User', gender: 'Female', status: 'inactive', contact: '09444444444' },
  { id: 7, firstName: 'Clifford', lastName: 'Ferrara', email: 'ferrara@example.com', username: 'clifford_f', age: 44, role: 'Editor', gender: 'Male', status: 'active', contact: '09555555555' },
  { id: 8, firstName: 'Frances', lastName: 'Rossini', email: 'rossini@example.com', username: 'frances_r', age: 36, role: 'User', gender: 'Female', status: 'active', contact: '09666666666' },
  { id: 9, firstName: 'Roxie', lastName: 'Harvey', email: 'harvey@example.com', username: 'roxie_h', age: 65, role: 'Admin', gender: 'Female', status: 'active', contact: '09777777777' },
];

export default function ReportsPage() {
  const [rows, setRows] = useState(sampleRows);
  const [filteredRows, setFilteredRows] = useState(sampleRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const reportRef = useRef();

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
    let filtered = rows;

    // Apply search filter
    if (search) {
      filtered = filtered.filter((row) =>
        row.firstName.toLowerCase().includes(search) ||
        row.lastName.toLowerCase().includes(search) ||
        row.email.toLowerCase().includes(search) ||
        row.username.toLowerCase().includes(search)
      );
    }

    // Apply role filter
    if (role) {
      filtered = filtered.filter((row) => row.role === role);
    }

    // Apply gender filter
    if (gender) {
      filtered = filtered.filter((row) => row.gender === gender);
    }

    // Apply status filter
    if (status) {
      filtered = filtered.filter((row) => row.status === status);
    }

    setFilteredRows(filtered);
  };

  // Export to PDF
  const exportToPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 280;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('reports.pdf');
  };

  // Print report
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=1200,height=800');
    const element = reportRef.current;
    const htmlContent = element.innerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reports</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1976d2; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #1976d2; color: white; }
            .chart-container { margin: 20px 0; page-break-inside: avoid; }
          </style>
        </head>
        <body>
          <h1>System Reports</h1>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Calculate statistics for charts
  const roleStats = [
    rows.filter(r => r.role === 'User').length,
    rows.filter(r => r.role === 'Admin').length,
    rows.filter(r => r.role === 'Editor').length
  ];

  const genderStats = [
    rows.filter(r => r.gender === 'Male').length,
    rows.filter(r => r.gender === 'Female').length
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Reports Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          View and manage user reports with advanced search and filtering
        </Typography>
      </Box>

      {/* Print and Export Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ backgroundColor: '#1976d2' }}
        >
          Print Report
        </Button>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={exportToPDF}
          sx={{ backgroundColor: '#388e3c' }}
        >
          Export to PDF
        </Button>
      </Stack>

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
          Results: {filteredRows.length} of {rows.length} users
        </Typography>
      </Paper>

      {/* Charts Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Users by Role
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: roleStats[0], label: 'User' },
                        { id: 1, value: roleStats[1], label: 'Admin' },
                        { id: 2, value: roleStats[2], label: 'Editor' }
                      ]
                    }
                  ]}
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
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Users by Gender
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                <BarChart
                  series={[{ data: genderStats, label: 'Count' }]}
                  categories={['Male', 'Female']}
                  width={400}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Table */}
      <Card ref={reportRef}>
        <CardContent sx={{ p: 0 }}>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.contact}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: row.status === 'active' ? '#4caf50' : '#f44336',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {row.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        No users found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
