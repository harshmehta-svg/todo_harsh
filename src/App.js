/**
 * @flow
 */

import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [register, setRegister] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleThemeToggle = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

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

  const handleRegister = () => {
    setRegister(true);
  };

  const handleRegisterSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // You might want to validate and handle the form submission here
    setIsLoggedIn(true);
    setLoginStatus(true);
  };

  return (
    <div className={`App ${theme === 'dark' ? 'dark-mode' : ''}`}>
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
              <button onClick={handleRegister}>Register</button>
              <button
                className="theme-toggle"
                onClick={handleThemeToggle}
              >
                {theme === 'light' ? (
                  <span className="material-icons">dark_mode</span>
                ) : (
                  <span className="material-icons">light_mode</span>
                )}
              </button>
            </form>
          )
        )}
        {register === true && (
          <form onSubmit={handleRegisterSubmit}>
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
            <button type="submit">Register</button>
            <button
              className="theme-toggle"
              onClick={handleThemeToggle}
            >
              {theme === 'light' ? (
                <span className="material-icons">dark_mode</span>
              ) : (
                <span className="material-icons">light_mode</span>
              )}
            </button>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;