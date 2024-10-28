// src/services/api.js

import axios from 'axios';

// Create an Axios instance with a base URL for the backend API
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Set default Content-Type for POST requests
API.defaults.headers.post['Content-Type'] = 'application/json';

// Helper function to set or remove the Authorization token in headers
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

// Interceptor to handle unauthorized responses globally
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - possibly invalid token');
      // Optional: handle 401 errors by logging out or redirecting
    }
    return Promise.reject(error);
  }
);

export default API;