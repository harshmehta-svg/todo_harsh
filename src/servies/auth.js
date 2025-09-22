// src/services/auth.js

const axios = require('axios');

// API Endpoint for registration
const REGISTRATION_ENDPOINT = 'https://api.example.com/register';

class AuthService {
  async register(user) {
    try {
      const response = await axios.post(REGISTRATION_ENDPOINT, user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(user) {
    try {
      const response = await axios.post('https://api.example.com/login', user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;