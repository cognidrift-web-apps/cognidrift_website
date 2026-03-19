import axios from 'axios';

// API Base URL - Change this to your backend URL
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dashboardToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('dashboardToken');
      localStorage.removeItem('dashboardExpiry');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = async (password) => {
  const response = await api.post('/api/dashboard/login', { password });
  return response.data;
};

// Stats
export const getStats = async (days = 7) => {
  const response = await api.get(`/api/dashboard/stats?days=${days}`);
  return response.data;
};

// Conversations
export const getConversations = async (filter = 'all', page = 1, limit = 10) => {
  const response = await api.get(`/api/dashboard/conversations?filter=${filter}&page=${page}&limit=${limit}`);
  return response.data;
};

export const getConversation = async (phoneNumber) => {
  const response = await api.get(`/api/dashboard/conversation/${encodeURIComponent(phoneNumber)}`);
  return response.data;
};

// Customers
export const getCustomers = async (search = '', page = 1, limit = 10) => {
  const response = await api.get(`/api/dashboard/customers?search=${search}&page=${page}&limit=${limit}`);
  return response.data;
};

// Callbacks
export const getCallbacks = async (filter = 'all', page = 1, limit = 10) => {
  const response = await api.get(`/api/dashboard/callbacks?filter=${filter}&page=${page}&limit=${limit}`);
  return response.data;
};

// Settings
export const updatePassword = async (currentPassword, newPassword) => {
  const response = await api.put('/api/dashboard/password', { currentPassword, newPassword });
  return response.data;
};

// ─── Blog API ────────────────────────────────────────────────────────────────

// Admin: Get all blogs (drafts + published)
export const getAdminBlogs = async () => {
  const response = await api.get('/api/admin/blogs');
  return response.data;
};

// Admin: Get single blog by ID (full content for editing)
export const getAdminBlogById = async (id) => {
  const response = await api.get(`/api/admin/blogs/${id}`);
  return response.data;
};

// Admin: Create blog
export const createBlog = async (blogData) => {
  const response = await api.post('/api/admin/blogs', blogData);
  return response.data;
};

// Admin: Update blog
export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/api/admin/blogs/${id}`, blogData);
  return response.data;
};

// Admin: Delete blog
export const deleteBlog = async (id) => {
  const response = await api.delete(`/api/admin/blogs/${id}`);
  return response.data;
};

export default api;
