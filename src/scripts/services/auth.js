// src/scripts/services/auth.js

import axios from 'axios';
import { authActions } from './authSlice';

export const login = async (credentials) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, credentials);
  if (res.status === 200) {
    const token = res.data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('username', res.data.username);
    axios.interceptors.push({
      request: (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
    });
    return res.data;
  } else {
    throw new Error('Invalid credentials');
  }
};

export const register = async (credentials) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, credentials);
  if (res.status === 201) {
    return res.data;
  } else {
    throw new Error('Failed to register');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  axios.interceptors.pop();
  return { type: authActions.LOGOUT.type };
};