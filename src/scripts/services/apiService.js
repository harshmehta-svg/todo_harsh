// apiService.js
import axios from 'axios';

// Define axios instance with base URL and token-based authentication
const apiService = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_TOKEN', // Replace with a valid token or remove this line if not required
  },
});

// Define API endpoints for tasks
const TASK_API = '/api/tasks';

// GET tasks
export const getTasks = async () => {
  try {
    const response = await apiService.get(TASK_API);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST new task
export const createTask = async (taskData) => {
  try {
    const response = await apiService.post(TASK_API, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET task by ID
export const getTaskById = async (taskId) => {
  try {
    const response = await apiService.get(`${TASK_API}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT task by ID
export const updateTaskById = async (taskId, updatedTaskData) => {
  try {
    const response = await apiService.put(`${TASK_API}/${taskId}`, updatedTaskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE task by ID
export const deleteTaskById = async (taskId) => {
  try {
    const response = await apiService.delete(`${TASK_API}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};