// src/services/api.js

import axios from 'axios';
import config from '../config';

class Api {
  // ...
  sendChatMessage = async (message) => {
    const url = config.openaiApiUrl;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.openaiApiToken}`,
    };

    const data = {
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 2048,
    };

    try {
      const response = await axios.post(url, data, { headers });

      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      return null;
    }
  };

  displayChatResponse = (response) => {
    const chatBubble = document.createElement('div');
    chatBubble.classList.add('chat-bubble');
    chatBubble.innerHTML = response;

    document.getElementById('chat-container').appendChild(chatBubble);
  };
}

export default Api;