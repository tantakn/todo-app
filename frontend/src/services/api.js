import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for adding auth tokens in the future
api.interceptors.request.use(
  (config) => {
    // Add auth token here when implementing authentication
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    
    // Log error for debugging
    console.error('API Error:', error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);

// Todo API functions
export const todoAPI = {
  // Get all todos with optional filters
  getTodos: async (params = {}) => {
    const response = await api.get('/api/todos', { params });
    return response.data;
  },

  // Get a specific todo by ID
  getTodo: async (id) => {
    const response = await api.get(`/api/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (todoData) => {
    const response = await api.post('/api/todos', todoData);
    return response.data;
  },

  // Update an existing todo
  updateTodo: async (id, updates) => {
    const response = await api.put(`/api/todos/${id}`, updates);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id) => {
    const response = await api.delete(`/api/todos/${id}`);
    return response.data;
  },

  // Toggle todo completion status
  toggleComplete: async (id) => {
    const response = await api.patch(`/api/todos/${id}/toggle`);
    return response.data;
  },
};

// Health check function
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend service is not available');
  }
};

// Future API functions for categories and users
export const categoryAPI = {
  getCategories: async () => {
    // const response = await api.get('/api/categories');
    // return response.data;
    return []; // Placeholder
  },

  createCategory: async (categoryData) => {
    // const response = await api.post('/api/categories', categoryData);
    // return response.data;
    return {}; // Placeholder
  },
};

export const userAPI = {
  getCurrentUser: async () => {
    // const response = await api.get('/api/users/me');
    // return response.data;
    return {}; // Placeholder
  },

  login: async (credentials) => {
    // const response = await api.post('/api/auth/login', credentials);
    // return response.data;
    return {}; // Placeholder
  },

  register: async (userData) => {
    // const response = await api.post('/api/auth/register', userData);
    // return response.data;
    return {}; // Placeholder
  },
};

export default api;
