// src/components/AIChatBot.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AIChatBot.css';

function AIChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://api.example.com/chat', { text: input });
      const message = response.data.message;
      // Check if it's an AI response, then update messages
      if (response.data.status === 'AI_RESPONSE') {
        setMessages([...messages, { text: response.data.message, from: 'AI' }]);
      } else {
        setMessages([...messages, { text: input, from: 'User' }]);
      }
      setInput('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get('https://api.example.com/chat');
        if (response.data.status === 'AI_RESPONSE') {
          setMessages([...messages, { text: response.data.message, from: 'AI' }]);
        }
      } catch (error) {
        setError(error.message);
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <form onSubmit={handleFormSubmission}>
      <div className="chatBot">
        <div className="header">AI Chat Bot</div>
        <div className="input-container">
          <input
            className="message-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <button
            className="send-button"
            type="submit"
            disabled={loading}
          >
            Send
          </button>
        </div>
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.from === 'AI' ? 'right' : 'left'}`}>
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </form>
  );
}

export default AIChatBot;