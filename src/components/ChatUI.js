// src/components/ChatUI.js

import React, { useState } from 'react';
import axios from 'axios';

// Styles for the chat bubble layout
import './chat-bubble.css';

const ChatUI = () => {
  // State to store the chat message and response
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  // Function to handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API endpoint URL for OpenAI (change as needed)
    const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/complete';

    // Set API credentials (change as needed)
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const model_params = {
      prompt: message,
      temperature: 0.7,
      max_tokens: 256,
    };

    try {
      // Send a POST request to the API endpoint
      const response = await axios.post(API_ENDPOINT, {
        model: model_params,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      // Update the chat response state
      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  // Render the chat UI component
  return (
    <div className="chat-container">
      <h2>Chat UI</h2>
      <div className="chat-bubble-layout">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
        <div className="chat-bubble">
          <p className="chat-text">{response}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;