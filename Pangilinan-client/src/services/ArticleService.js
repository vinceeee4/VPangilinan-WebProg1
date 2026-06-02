import axios from 'axios';
import { getApiBaseUrl, getAuthToken } from '../utils/auth';

const api = axios.create({
  baseURL: getApiBaseUrl()
});

const publicApi = axios.create({
  baseURL: getApiBaseUrl()
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchPublicArticles = () => publicApi.get('/articles');
export const fetchDashboardArticles = () => api.get('/articles');
export const fetchArticles = fetchPublicArticles;
export const fetchArticle = (name) => publicApi.get(`/articles/${name}`);
export const createArticle = (payload) => api.post('/articles', payload);
export const updateArticle = (id, payload) => api.put(`/articles/${id}`, payload);
export const deleteArticle = (id) => api.delete(`/articles/${id}`);
export const setArticleActive = (id, isActive) =>
  updateArticle(id, { isActive });

export const mapArticleFromApi = (rawArticle) => {
  if (!rawArticle) return null;

  const content = Array.isArray(rawArticle.content)
    ? rawArticle.content
    : String(rawArticle.content || '').split(/\n+/).filter(Boolean);

  return {
    _id: rawArticle._id,
    name: rawArticle.name,
    title: rawArticle.title,
    content,
    image: rawArticle.imageUrl || rawArticle.image || '',
    imageUrl: rawArticle.imageUrl || rawArticle.image || '',
    isActive: rawArticle.isActive ?? true
  };
};
