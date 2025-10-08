// @flow

import React, { useState } from 'react':
import './App.css':
import { FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const [username, setUsername] = useState(''):
  const [password, setPassword] = useState(''):
  const [loginStatus, setLoginStatus] = useState(false):
  const [isLoggedIn, setIsLoggedIn] = useState(null):
  const [darkMode, setDarkMode] = useState(false);

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
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
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
        <div className="dark-mode-toggle">
          <button onClick={toggleDarkMode}>
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;