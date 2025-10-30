import React, { useState } from 'react';
import './App.css';
import './styles/AIChatBot.css'; // ADDITIONAL STYLES FOR THE CHATBOT
import AIChatBot from './components/AIChatBot'; // NEW IMPORT FOR THE CHATBOT COMPONENT

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogin = (event: any) => {
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
        <AIChatBot /> {/* ADDED THE CHATBOT COMPONENT TO THE APP */}
      </header>
    </div>
  );
}

export default App;
// NEW COMPONENT FOR THE CHATBOT
import React, { useState } from 'react';
import './AIChatBot.css';

function AIChatBot() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleSendMessage = () => {
    const newMessages = messages.concat([{
      text: userMessage,
      isUser: true,
    }]);
    setMessages(newMessages);
    setMessage(''); // CLEAR THE INPUT FIELD AFTER SENDING THE MESSAGE
    asyncSendMessage(userMessage);
  };

  const asyncSendMessage = async (userMessage) => {
    try {
      const response = await fetch('https://api.example.com/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      }); // REPLACE WITH YOUR ACTUAL API ENDPOINT
      const data = await response.json();
      const newMessages = messages.concat([{
        text: data.response,
        isUser: false,
      }]);
      setMessages(newMessages);
      setAiResponse(data.response);
      setUserMessage(''); // CLEAR THE INPUT FIELD AFTER RECEIVING THE RESPONSE
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list"
           style={{ overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}
      >
        {messages.map((message, index) => (
          <p
            key={index}
            style={{
              clear: 'both',
              margin: 0,
              padding: 0,
              textAlign: message.isUser ? 'right' : 'left',
            }}
          >
            <span
              style={{
                backgroundColor: message.isUser ? '#ddd' : '#f0f0f0',
                padding: '5px',
                borderRadius: '5px',
                clear: 'both',
                display: 'inline-block',
                textAlign: message.isUser ? 'right' : 'left',
              }}
            >
              {message.text}
            </span>
          </p>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(event) => setUserMessage(event.target.value)}
        style={{ width: '100%', height: '30px', padding: '10px', marginBottom: '10px' }}
      />
      <button type="button" onClick={handleSendMessage}>
        Send
      </button>
      <p className="ai-response"
         style={{ clear: 'both', margin: 0, padding: 0 }}
      >
        <span
          style={{
            backgroundColor: '#f0f0f0',
            padding: '5px',
            borderRadius: '5px',
            clear: 'both',
            display: 'inline-block',
            textAlign: 'left',
          }}
        >
          {aiResponse}
        </span>
      </p>
    </div>
  );
}

export default AIChatBot;

// THIS FILE CONTAINS STYLES FOR THE CHATBOT
.container{
  position: relative;
  width: 500px;
  height: 700px;
  margin: 10px auto;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  /* box-shadow: 0 0 10px rgba(0,0,0,0.1); */
}

.message-list{
  clear: both;
  padding: 10px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  position: relative;
}

.message-list::before {
  content: "";
  display: block;
  clear: both;
}

.msg-container{
  clear: both;
  padding: 10px;
  margin-bottom: 20px;
}

.msg{
  background-color: #ccc;
  padding: 10px;
  border-radius: 10px;
  float: right;
  textAlign: right;
}

.msg::before {
  content: "";
  display: block;
  clear: both;
}

.ai{
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  float: left;
  textAlign: left;
}

.ai::before {
  content: "";
  display: block;
  clear: both;
}

.ai-response{
  clear: both;
  padding: 10px;
  margin-top: 20px;
}

.ai-response::before {
  content: "";
  display: block;
  clear: both;
}

.button{
  cursor: pointer;
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  float: right;
}

.button:hover{
  background-color: #3e8e41;
}

.aiInput {
  height: 30px;
  border: 0;
  padding: 10px;
  width: 80%;
  padding-left: 10px;
  font-size: 14px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: inline-block;
}

.sendButton{
  color: #fff;
  width: 20%;
  display: inline-block;
  padding: 10px;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sendButton:hover{
  background-color: #3e8e41;
}