import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { fetchArticleSelections } from '../../services/ArticleSelectionService';

const ArticleSelectionsPage = () => {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSelections = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await fetchArticleSelections();
        setSelections(data?.selections || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load article selections.');
      } finally {
        setLoading(false);
      }
    };

    loadSelections();
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Article Selections
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          See which articles have been selected and when.
        </Typography>
      </Box>

      {error ? (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      ) : null}

      <Stack spacing={2}>
        {selections.length === 0 && !loading ? (
          <Typography sx={{ color: 'text.secondary' }}>No selections have been recorded yet.</Typography>
        ) : null}

        {selections.map((selection) => (
          <Card key={selection._id}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {selection.article?.title || selection.articleTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Selected by {selection.userName || selection.userEmail} ({selection.userType})
                  </Typography>
                  <Chip label={`Selected at: ${new Date(selection.selectedAt).toLocaleString()}`} size="small" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {loading && (
        <Typography sx={{ color: 'text.secondary', mt: 2 }}>Loading selections...</Typography>
      )}
    </Box>
  );
};

export default ArticleSelectionsPage;
