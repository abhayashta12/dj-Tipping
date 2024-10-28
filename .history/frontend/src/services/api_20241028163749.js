import axios from 'axios';

// Create an Axios instance with a base URL for the backend API
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Helper function to set or remove the Authorization token in headers
export const setAuthToken = (token) => {
  if (token) {
    // Set the token in the Authorization header
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove the Authorization header if no token is provided
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
