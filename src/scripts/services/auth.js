// src/scripts/services/auth.js

import axios from 'axios';
import { loginUrl } from './config'; // assuming config.js contains the API URL
import { storeToken, removeToken } from './token.js'; // assuming token.js handles token storage

class Auth {
  async login(username, password) {
    try {
      const response = await axios.post(loginUrl, { username, password });
      storeToken(response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    removeToken();
    window.location.href = '/'; // Assuming login is required for every page
  }

  async register(username, password) {
    try {
      const response = await axios.post(loginUrl, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async validateToken() {
    const token = await this.getToken();
    if (!token) return false;
    try {
      const response = await axios.get(`${loginUrl}/validate-token`);
      return response.data.valid;
    } catch (error) {
      removeToken();
      return false;
    }
  }

  async getToken() {
    return tokenFromLocalStorage();
  }
}

// Helper function to get token from local storage
function tokenFromLocalStorage() {
  const storedToken = localStorage.getItem('token');
  if (storedToken) return storedToken;
  return null;
}

export { Auth };
