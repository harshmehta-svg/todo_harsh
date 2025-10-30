// src/scripts/services/aiService.js

// Import dependencies
import axios from 'axios';
import { useState, useEffect } from 'react';

const AI_API_URL = 'https://example.ai/api/v1/chat';

const apiService = {
  async getChatHistory() {
    try {
      const response = await axios.get(`${AI_API_URL}/history`);
      return response.data;
    } catch (error) {
      console.error('Error getting chat history:', error);
    }
  },

  async sendMessage(message) {
    try {
      const response = await axios.post(`${AI_API_URL}/message`, { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
};

export default apiService;