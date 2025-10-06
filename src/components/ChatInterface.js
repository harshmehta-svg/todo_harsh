// src/components/ChatInterface.js

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const filteredMessages = useMemo(() => messages.sort((a, b) => b.timestamp - a.timestamp), [messages]);

  useEffect(() => {
    axios.get('/api/messages')
      .then(response => {
        setMessages(response.data.sort((a, b) => b.timestamp - a.timestamp));
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage) return;
    setLoading(true);
    try {
      const response = await axios.post('/api/messages', { message: newMessage, timestamp: Date.now() });
      setMessages([...messages, response.data]);
      setAiResponse(response.data.ai_response);
      setNewMessage('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const renderMessages = () => {
    return filteredMessages.map((message, index) => (
      <div key={index} className="message">
        <p><strong>User</strong>: {message.message}</p>
        <p><strong>AI</strong>: {message.ai_response}</p>
      </div>
    ));
  };

  const handleLoadPreviousMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/messages');
      setMessages(response.data.sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <h2>Chat Interface</h2>
      <div className="message-container">
        <button onClick={handleLoadPreviousMessages}>Load Previous Messages</button>
        {renderMessages()}
      </div>
      <div className="new-message-container">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send Message</button>
        {loading && <span>Loading...</span>}
        {error && <span>Error: {error}</span>}
        {aiResponse && <p><strong>AI</strong>: {aiResponse}</p>}
      </div>
    </div>
  );
};

export default ChatInterface;