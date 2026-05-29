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
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  mapArticleFromApi,
  updateArticle
} from '../../services/ArticleService';
import { getCurrentUser } from '../../utils/auth';

const blankForm = {
  name: '',
  title: '',
  imageUrl: '',
  contentText: '',
  isActive: true
};

const truncate = (text, max = 100) => {
  const value = String(text || '').trim();
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

export default function DashArticlesPage() {
  const currentUser = getCurrentUser();
  const role = currentUser?.type || 'user';
  const canCreate = ['admin', 'editor'].includes(role);
  const canEdit = ['admin', 'editor'].includes(role);
  const canDelete = role === 'admin';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [query, setQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(blankForm);
  const [formError, setFormError] = useState('');

  const loadArticles = async () => {
    try {
      setLoading(true);
      setApiError('');
      const { data } = await fetchArticles();
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
      if (!search) return true;
      return [article.name, article.title, article.description]
        .join(' ')
        .toLowerCase()
        .includes(search);
    });
  }, [articles, query]);

  const openDialog = (article) => {
    if (!article && !canCreate) return;
    if (article && !canEdit) return;

    setEditingId(article?._id || null);
    setFormData(article ? {
      name: article.name || '',
      title: article.title || '',
      imageUrl: article.imageUrl || '',
      contentText: (article.content || []).join('\n\n'),
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
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.title.trim() || !formData.imageUrl.trim() || !formData.contentText.trim()) {
      setFormError('Slug, title, image URL, and content are required.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      title: formData.title.trim(),
      imageUrl: formData.imageUrl.trim(),
      content: formData.contentText.split(/\n\n+/).map((text) => text.trim()).filter(Boolean),
      isActive: formData.isActive
    };

    try {
      if (editingId) {
        await updateArticle(editingId, payload);
      } else {
        await createArticle(payload);
      }

      await loadArticles();
      closeDialog();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Unable to save article.');
    }
  };

  const handleToggleActive = async (article) => {
    if (!canEdit) return;

    try {
      await updateArticle(article._id, { isActive: !article.isActive });
      await loadArticles();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Unable to update article.');
    }
  };

  const handleDelete = async (id) => {
    if (!canDelete || !window.confirm('Delete this article?')) return;

    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Unable to delete article.');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Slug', minWidth: 150, flex: 1 },
    { field: 'title', headerName: 'Title', minWidth: 200, flex: 1.2 },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 240,
      flex: 1.4,
      valueGetter: (value, row) => truncate(row.description)
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
          <Button size="small" variant="outlined" disabled={!canEdit} onClick={() => openDialog(row)}>
            {canEdit ? 'Edit' : 'View Only'}
          </Button>
          <Button size="small" variant="contained" color={row.isActive ? 'warning' : 'success'} disabled={!canEdit} onClick={() => handleToggleActive(row)}>
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
          <IconButton size="small" color="error" disabled={!canDelete} onClick={() => handleDelete(row._id)} aria-label="delete article">
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
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Articles</Typography>
          <Typography variant="body2" color="text.secondary">
            {role === 'user' ? 'User access is read-only.' : role === 'editor' ? 'Editor access can update articles.' : 'Admin access can manage all articles.'}
          </Typography>
        </Box>
        <Button variant="contained" disabled={!canCreate} onClick={() => openDialog()}>
          Add Article
        </Button>
      </Stack>

      {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
          }}
        />
      </Paper>

      <Paper sx={{ height: 540, width: '100%', p: 1 }}>
        <DataGrid
          rows={filteredArticles}
          columns={columns}
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
              <TextField name="name" label="Slug" value={formData.name} onChange={handleChange} fullWidth />
              <TextField name="title" label="Title" value={formData.title} onChange={handleChange} fullWidth />
              <TextField name="imageUrl" label="Image URL" value={formData.imageUrl} onChange={handleChange} fullWidth />
              <TextField
                name="contentText"
                label="Content"
                value={formData.contentText}
                onChange={handleChange}
                multiline
                minRows={6}
                helperText="Separate paragraphs with a blank line."
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" variant="contained">{editingId ? 'Save Changes' : 'Add Article'}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
