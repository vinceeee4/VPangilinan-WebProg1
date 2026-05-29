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

export const recordArticleSelection = (articleId) =>
  api.post('/article-selections', { articleId });

export const fetchArticleSelections = () => api.get('/article-selections');
export const fetchMyArticleSelections = () => api.get('/article-selections/me');
