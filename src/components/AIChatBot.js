// src/components/AIChatBot.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './styles.css';

function AIChatBot() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await Axios.get('https://my-ai-api.com/messages');
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const response = await Axios.post('https://my-ai-api.com/messages', {
          message: newMessage,
        });
        setMessages([...messages, response.data]);
        setNewMessage('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.author === 'user' ? 'user-message' : 'ai-message'}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type a message..."
        />
        <button type="button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChatBot;

// styles.css (added styles)
.chat-container {
  width: 300px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}

.message-list {
  height: 450px;
  overflow-y: auto;
  padding: 10px;
}

.user-message {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  text-align: right;
}

.ai-message {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
}

.input-container {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

input {
  width: 80%;
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

button {
  width: 20%;
  height: 30px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}