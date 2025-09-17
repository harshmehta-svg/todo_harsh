// @flow

import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <header className="App-header">
        <button onClick={handleToggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        {isLoggedIn === true ? (
          <div>
            <h2>
              Welcome, {username}! <button onClick={handleLogout}>Logout</button>
            </h2>
            <h3>
              You are currently in {darkMode ? 'dark mode' : 'light mode'}
            </h3>
          </div>
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
    </div>
  );
}

export default App;