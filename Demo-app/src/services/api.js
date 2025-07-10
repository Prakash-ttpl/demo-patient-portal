import axios from 'axios';

const BASE_URL = 'http://192.168.0.235:3000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('health_first_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Auto-logout on 401
        localStorage.removeItem('health_first_token');
        localStorage.removeItem('health_first_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api; 