// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import ConversationThread from './ConversationThread';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [conversationThreads, setConversationThreads] = useState([]);

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

  useEffect(() => {
    if (isLoggedIn === true) {
      const initialConversationThreads = [
        {
          id: 1,
          messages: [
            { text: 'Hello!', sender: 'AI' },
            { text: 'Hi! How can I help you?', sender: 'User' },
          ],
        },
        {
          id: 2,
          messages: [
            { text: 'What is your name?', sender: 'User' },
            { text: 'My name is AI Assistant!', sender: 'AI' },
          ],
        },
      ];
      setConversationThreads(initialConversationThreads);
    }
  }, [isLoggedIn]);

  const handleAddThread = () => {
    const newThread = {
      id: conversationThreads.length + 1,
      messages: [{ text: '', sender: null }],
    };
    setConversationThreads([...conversationThreads, newThread]);
  };

  const handleSendMessage = (threadId: number, message: string) => {
    const updatedThreads = conversationThreads.map((thread) => {
      if (thread.id === threadId) {
        thread.messages.push({ text: message, sender: 'User' });
      }
      return thread;
    });
    setConversationThreads(updatedThreads);
  };

  const handleSwitchThread = (threadId: number) => {
    const updatedThreads = conversationThreads.map((thread) => {
      if (thread.id === threadId) {
        thread.messages.forEach((message) => {
          message.sender = threadId === threadId ? 'User' : 'AI';
        });
      }
      return thread;
    });
    setConversationThreads(updatedThreads);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>Welcome, {username}! <button onClick={handleLogout}>Logout</button></h2>
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
      <div className="conversation-threads">
        {conversationThreads.map((thread) => (
          <ConversationThread
            key={thread.id}
            thread={thread}
            onSendMessage={(message) => handleSendMessage(thread.id, message)}
            onSwitchThread={() => handleSwitchThread(thread.id)}
          />
        ))}
        <button onClick={handleAddThread}>Add Thread</button>
      </div>
    </div>
  );
}

export default App;