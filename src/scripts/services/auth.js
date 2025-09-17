// src/scripts/services/auth.js

import axios from 'axios';
import config from './config';

const api = axios.create({
  // Add API base URL here
  baseURL: config.api.baseURL,
});

// Existing code

const AuthService = {
  /**
   * Sign in the user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<any>}
   */
  async signin(email, password) {
    // TO DO: implement signin logic
  },
};

/**
 * Sign in the user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<any>}
 */
const login = async (email, password) => {
  const response = await api.post('/users/login', {
    email,
    password,
  });

  return {
    data: response.data,
    token: response.data.token,
  };
};

// Add login API call
AuthService.login = login;

// Existing code

export default AuthService;