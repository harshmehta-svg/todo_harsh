// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import ReactQuill from 'react-quill';
import io from 'socket.io-client'; // Add io import for WebSocket

const socket = io('http://localhost:3001'); // Setup WebSocket connection to server

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [text, setText] = useState('');
  const [editorChanges, setEditorChanges] = useState({}); // Add state for editor changes

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

  const handleChanges = (delta, oldDelta, source) => {
    const value = delta;
    const changes = {
      text: value,
      user: username,
    };
    setEditorChanges(changes);
    socket.emit('editorChanges', changes); // Emit changes to server
  };

  useEffect(() => {
    socket.on('editorChanges', (data) => {
      if (data.user !== username) {
        setText(data.text);
      }
    });
  }, [data, username, text]); // Add dependencies to useEffect

  useEffect(() => {
    return () => {
      socket.disconnect(); // Disconnect on unmount
    };
  }, []);

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
      <div className="editor">
        <ReactQuill
          value={text}
          onChange={handleChanges}
          modules={{ toolbar: ['bold', 'italic', 'underline'] }}
          placeholder="Type here..."
          name="text"
        />
      </div>
    </div>
  );
}

export default App;

// If you're using a version of node.js that doesn't have built-in support for web socket
// Then make sure to add the following to your server.js
// const server = http.createServer(app).listen(port);
// const io = require('socket.io')(server, { cors: { origin: '*' } });
// Then on client side modify the socket import to const socket = io(server.io);