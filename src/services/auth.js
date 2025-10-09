// src/services/auth.js

import axios from 'axios';
import apiService from './apiService';

// Set up the API configuration
const apiEndpoint = '/api/tasks';
const authService = axios.create({
  baseURL: 'http://localhost:5000', // assuming a local backend server
});

const tokenStorage = localStorage.getItem('token');

// Function to handle the token-based authentication
const getAuthToken = () => {
  if (tokenStorage) {
    return tokenStorage;
  } else {
    alert('You must be logged in to access this feature.');
    return null;
  }
};

// Modify the getTasks function to include the token-based authentication header
const getTasks = async () => {
  try {
    const token = getAuthToken();
    if (!token) return console.error('No token found');

    const response = await authService.get(`${apiEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Modify the postTask function to include the token-based authentication header
const postTask = async (task) => {
  try {
    const token = getAuthToken();
    if (!token) return console.error('No token found');

    const response = await authService.post(`${apiEndpoint}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Modify the putTask function to include the token-based authentication header
const putTask = async (id, task) => {
  try {
    const token = getAuthToken();
    if (!token) return console.error('No token found');

    const response = await authService.put(`${apiEndpoint}/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Modify the deleteTask function to include the token-based authentication header
const deleteTask = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) return console.error('No token found');

    const response = await authService.delete(`${apiEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Export the modified services
export { apiEndpoint, getTasks, postTask, putTask, deleteTask };