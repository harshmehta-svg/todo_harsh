// src/scripts/auth.js

import axios from 'axios';

const authenticate = async (username, password) => {
  const response = await axios.post('/api/auth/login', {
    username,
    password,
  });

  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (token && username) {
    return true;
  }

  return false;
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getUsername = () => {
  return localStorage.getItem('username');
};

export {
  authenticate,
  logout,
  isUserLoggedIn,
  getToken,
  getUsername,
};