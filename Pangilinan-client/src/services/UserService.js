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

export const loginUser = (payload) => api.post('/users/login', payload);
export const registerUser = (payload) => api.post('/users/register', payload);
export const fetchUsers = () => api.get('/users');
export const createUser = (payload) => api.post('/users', payload);
export const updateUser = (id, payload) => api.put(`/users/${id}`, payload);
export const deleteUser = (id) => api.delete(`/users/${id}`);
