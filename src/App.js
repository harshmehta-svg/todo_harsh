// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(null);

  const apiEndpoint = 'https://api.chat.openai.com/v1/messages';
  const apiKey = 'YOUR_OPENAI_API_KEY';
  axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

  const handleLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  const handleSendMessage = async () => {
    if (isLoggedIn) {
      const response = await axios.post(apiEndpoint, {
        messages: [
          {
            type: 'text',
            user: {
              id: 'USER_NAME',
            },
            text: input,
          },
        ],
      });
      const parsedResponse = response.data;
      setMessages((prevMessages) => [...(prevMessages || []), parsedResponse]);
      setInput('');
    } else {
      alert('Please login first to send messages');
    }
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleInputChange = (event: SyntheticEvent) => {
    setInput(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}! <button onClick={handleLogout}>Logout</button>
          </h2>
        ) : (
          loginStatus === false && (
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          )
        )}
      </header>
      <div className="chat-container">
        <ul>
          {messages &&
            messages.messages.map((message) => (
              <li key={message.id}>
                <div className="message-user">{message.user.id}</div>
                <div className="message-text">{message.text}</div>
              </li>
            ))}
        </ul>
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;