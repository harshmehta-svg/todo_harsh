// src/services/auth.js

import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import store from '../store.js';

const auth = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

auth.interceptors.push({
  request: (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error: (error) => {
    if (error.response.status === 401) {
      store.dispatch({ type: 'LOGOUT' });
    }
    return Promise.reject(error);
  },
});

const login = (username, password) => {
  return auth.post('/login', { username, password });
};

const signup = (username, password) => {
  return auth.post('/signup', { username, password });
};

export { login, signup };

export default auth;