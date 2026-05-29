import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ArticleList from '../../components/ArticleList';
import { fetchArticles, mapArticleFromApi } from '../../services/ArticleService';

const DashArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await fetchArticles();
        setArticles((data?.articles || []).map(mapArticleFromApi));
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load articles.');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Article Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Review published articles and manage available content.
        </Typography>
      </Box>

      {error ? (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      ) : null}

      {!loading && articles.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>
          No articles found.
        </Typography>
      ) : (
        <ArticleList articles={articles} />
      )}

      {loading && (
        <Typography sx={{ color: 'text.secondary' }}>
          Loading articles...
        </Typography>
      )}
    </Box>
  );
};

export default DashArticlesPage;
