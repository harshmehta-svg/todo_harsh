// @flow
import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogin = (event:SyntheticEvent) => {
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`App ${isDarkMode ? 'App-dark' : ''}`}
      style={{ backgroundColor: `${isDarkMode ? '#333' : '#f0f0f0'}` }}
    >
      <header className="App-header">
        <button onClick={toggleDarkMode}>Dark Mode</button>
        {isLoggedIn === true ? (
          <h2 style={{ color: `${isDarkMode ? '#ccc' : '#000'}` }}>
            Welcome, {username}!
            <button onClick={handleLogout} style={{ color: `${isDarkMode ? '#ccc' : '#000'}` }}>
              Logout
            </button>
          </h2>
        ) : (
          loginStatus === false && (
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                style={{ backgroundColor: `${isDarkMode ? '#333' : '#f0f0f0'}` }}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ backgroundColor: `${isDarkMode ? '#333' : '#f0f0f0'}` }}
              />
              <button type="submit" style={{ backgroundColor: `${isDarkMode ? '#333' : '#f0f0f0'}` }}>
                Login
              </button>
            </form>
          )
        )}
      </header>
    </div>
  );
}

export default App;