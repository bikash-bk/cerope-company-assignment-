import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data) => API.post('/api/auth/register', data).then(r => r.data);
export const login = (data) => API.post('/api/auth/login', data).then(r => r.data);
export const getMe = () => API.get('/api/auth/me').then(r => r.data);
export const updateProfile = (data) => API.put('/api/user/profile', data).then(r => r.data);
