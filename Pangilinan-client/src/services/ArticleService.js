import axios from 'axios';
import { getApiBaseUrl, getAuthToken } from '../utils/auth';

const api = axios.create({
  baseURL: getApiBaseUrl()
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchArticles = () => api.get('/articles');
export const fetchArticle = (name) => api.get(`/articles/${name}`);

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
    isActive: rawArticle.isActive ?? true
  };
};
