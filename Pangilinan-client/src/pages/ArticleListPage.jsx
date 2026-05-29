import { useEffect, useState } from 'react';
import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import { fetchArticles, mapArticleFromApi } from '../services/ArticleService';

const ArticleListPage = () => {
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
    <div className="flex w-full flex-col gap-6">
      {/* Header Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Explore the latest F1 articles and insights
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Dive into detailed articles about Formula 1 teams, drivers, circuits,
          and the thrilling world of motorsport.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* Grid Section - Applying your style */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Latest F1 News and Analysis
          </h2>
        </div>

        {loading && (
          <p className="text-sm leading-7 text-zinc-600">Loading articles...</p>
        )}

        {error && (
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <p className="text-sm leading-7 text-zinc-600">No articles published yet.</p>
        )}

        {!loading && !error && articles.length > 0 && (
          <ArticleList articles={articles} />
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;
