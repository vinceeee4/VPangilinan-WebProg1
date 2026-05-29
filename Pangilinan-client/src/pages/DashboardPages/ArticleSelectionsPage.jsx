import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Chip,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { getAllArticleSelections } from '../../services/ArticleSelectionService';

const labelize = (value) => value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleString();
};

export default function ArticleSelectionsPage() {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [query, setQuery] = useState('');

  const loadSelections = async () => {
    try {
      setLoading(true);
      setApiError('');
      const { data } = await getAllArticleSelections();
      setSelections((data?.selections || []).map((selection) => ({
        ...selection,
        id: selection._id,
        articleId: selection.article?._id || selection.article,
        articleTitle: selection.article?.title || selection.articleTitle,
        userName: selection.userName || [selection.user?.firstName, selection.user?.lastName].filter(Boolean).join(' '),
        userEmail: selection.user?.email || selection.userEmail,
        userType: selection.user?.type || selection.userType
      })));
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to load article selections.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSelections();
  }, []);

  const filteredSelections = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return selections;

    return selections.filter((selection) => [
      selection.userName,
      selection.userEmail,
      selection.userType,
      selection.articleTitle,
      selection.articleId
    ].join(' ').toLowerCase().includes(search));
  }, [selections, query]);

  const columns = [
    { field: 'userName', headerName: 'User Name', minWidth: 180, flex: 1 },
    { field: 'userEmail', headerName: 'Email', minWidth: 230, flex: 1.2 },
    {
      field: 'userType',
      headerName: 'Role',
      minWidth: 110,
      renderCell: ({ row }) => <Chip size="small" label={labelize(row.userType)} />
    },
    { field: 'articleTitle', headerName: 'Article Title', minWidth: 240, flex: 1.4 },
    { field: 'articleId', headerName: 'Article ID', minWidth: 220, flex: 1 },
    {
      field: 'selectedAt',
      headerName: 'Date Selected',
      minWidth: 190,
      valueFormatter: (value) => formatDate(value)
    }
  ];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems={{ sm: 'center' }} justifyContent="space-between">
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Article Selections</Typography>
          <Typography variant="body2" color="text.secondary">Admin-only history of users opening and reading articles.</Typography>
        </Box>
      </Stack>

      {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search selections..."
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
          }}
        />
      </Paper>

      <Paper sx={{ height: 560, width: '100%', p: 1 }}>
        <DataGrid
          rows={filteredSelections}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      </Paper>
    </Box>
  );
}
