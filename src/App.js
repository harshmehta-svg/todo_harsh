// @flow

import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? 'dark' : 'light';

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
    <div className={`App ${theme}`}>
      <header className={`App-header ${theme}`}>
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}!{' '}
            <button onClick={handleLogout}>Logout</button>
            <button className="toggle-button" onClick={handleToggleDarkMode}>
              Toggle Dark Mode
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
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit">Login</button>
              <button className="toggle-button" onClick={handleToggleDarkMode}>
                Toggle Dark Mode
              </button>
            </form>
          )
        )}
      </header>
    </div>
  );
}

export default App;