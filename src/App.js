import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [AIResponse, setAIResponse] = useState('');

  const handleLogin = (event) => {
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
    setUserMessage('');
    setChatHistory([]);
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: userMessage,
          max_tokens: 200,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
          },
        }
      );
      setAIResponse(response.data.choices[0].text);
      setUserMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendRequest();
  };

  useEffect(() => {
    if (userMessage) {
      const newChatHistory = [...chatHistory, { user: true, message: userMessage }];
      setChatHistory(newChatHistory);
    }
    if (AIResponse) {
      const newChatHistory = [...chatHistory, { user: false, message: AIResponse }];
      setChatHistory(newChatHistory);
    }
  }, [userMessage, AIResponse]);

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}!
            <button onClick={handleLogout}>Logout</button>
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
        <div className="left-chat">
          {chatHistory.map((message, index) => (
            <div className="message" key={index}>
              {message.user ? (
                <span className="user-message">{message.message}</span>
              ) : (
                <span className="AI-response">{message.message}</span>
              )}
            </div>
          ))}
        </div>
        <div className="right-chat">
          {chatHistory.map((message, index) => (
            <div className="message" key={index}>
              {message.user ? (
                <span className="user-message">{message.message}</span>
              ) : (
                <span className="AI-response">{message.message}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Send a message"
            value={userMessage}
            onChange={(event) => setUserMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;