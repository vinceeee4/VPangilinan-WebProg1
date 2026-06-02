import { useEffect, useMemo, useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
  createArticle,
  deleteArticle,
  fetchDashboardArticles,
  mapArticleFromApi,
  setArticleActive,
  updateArticle
} from '../../services/ArticleService';
import { getCurrentUser } from '../../utils/auth';

const blankForm = {
  name: '',
  title: '',
  imageUrl: '',
  content: '',
  isActive: true
};

const DashArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(blankForm);
  const [formError, setFormError] = useState('');
  const currentUser = getCurrentUser();
  const canDelete = currentUser?.type === 'admin';

  const loadArticles = async () => {
    try {
      setLoading(true);
      setApiError('');
      const { data } = await fetchDashboardArticles();
      setArticles((data?.articles || []).map(mapArticleFromApi));
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to load articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch = !search || [
        article.title,
        article.name,
        article.content[0]
      ].join(' ').toLowerCase().includes(search);
      const matchesStatus = statusFilter === '' ||
        String(article.isActive) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [articles, query, statusFilter]);

  const openDialog = (article) => {
    setEditingId(article?._id || null);
    setFormData(article ? {
      name: article.name,
      title: article.title,
      imageUrl: article.imageUrl,
      content: article.content.join('\n\n'),
      isActive: article.isActive
    } : blankForm);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = formData.content
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (!formData.name.trim() || !formData.title.trim() ||
        !formData.imageUrl.trim() || content.length === 0) {
      setFormError('Slug, title, image URL, and content are required.');
      return;
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      title: formData.title.trim(),
      imageUrl: formData.imageUrl.trim(),
      content
    };

    try {
      if (editingId) {
        await updateArticle(editingId, payload);
      } else {
        await createArticle(payload);
      }

      await loadArticles();
      closeDialog();
    } catch (error) {
      setFormError(error.response?.data?.message || 'Unable to save article.');
    }
  };

  const handleToggleActive = async (article) => {
    try {
      await setArticleActive(article._id, !article.isActive);
      await loadArticles();
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to update article status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;

    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to delete article.');
    }
  };

  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 220, flex: 1.2 },
    { field: 'name', headerName: 'Slug', minWidth: 180, flex: 1 },
    {
      field: 'preview',
      headerName: 'Preview',
      minWidth: 260,
      flex: 1.4,
      valueGetter: (_, row) => row.content[0] || ''
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          color={row.isActive ? 'success' : 'default'}
          label={row.isActive ? 'Published' : 'Disabled'}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: canDelete ? 280 : 230,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openDialog(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => handleToggleActive(row)}
          >
            {row.isActive ? 'Disable' : 'Enable'}
          </Button>
          {canDelete && (
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(row._id)}
              aria-label="delete article"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      )
    }
  ];

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 3 }}
        alignItems={{ sm: 'center' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Article Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create, publish, disable, and update public articles.
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => openDialog()}>
          Add Article
        </Button>
      </Stack>

      {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            size="small"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            select
            size="small"
            label="Status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="true">Published</MenuItem>
            <MenuItem value="false">Disabled</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Paper sx={{ height: 540, width: '100%', p: 1 }}>
        <DataGrid
          rows={filteredArticles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      </Paper>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{editingId ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent dividers>
            {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField name="title" label="Title" value={formData.title} onChange={handleChange} fullWidth />
              <TextField name="name" label="Slug" value={formData.name} onChange={handleChange} helperText="Example: monaco-grand-prix-guide" fullWidth />
              <TextField name="imageUrl" label="Image URL" value={formData.imageUrl} onChange={handleChange} fullWidth />
              <TextField
                name="content"
                label="Content"
                value={formData.content}
                onChange={handleChange}
                helperText="Separate paragraphs with blank lines."
                multiline
                minRows={7}
                fullWidth
              />
              <FormControlLabel
                control={<Switch name="isActive" checked={Boolean(formData.isActive)} onChange={handleChange} />}
                label={formData.isActive ? 'Published article' : 'Disabled article'}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingId ? 'Save Changes' : 'Add Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticlesPage;
