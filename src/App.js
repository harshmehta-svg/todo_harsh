// @flow
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://your-api/login', {
        username,
        password
      });
      if (response.data.success) {
        setIsLoggedIn(true);
        setLoginStatus(true);
        setLoginError(null);
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      setLoginError('Failed to login');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
    setLoginError(null);
  };

  const handleInputChange = (event: SyntheticEvent) => {
    const { id, value } = event.target;
    if (id === 'username') {
      setUsername(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://your-api/register', {
        username,
        password
      });
      if (response.data.success) {
        setIsRegisterOpen(false);
        setIsLoggedIn(true);
        setLoginStatus(true);
        setLoginError(null);
      } else {
        setLoginError('Failed to register');
      }
    } catch (error) {
      setLoginError('Failed to register');
    }
  };

  const handleRegisterOpen = () => {
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <div>
            <h2>Welcome, {username}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          loginStatus === false && !isRegisterOpen && (
            <div className="login-modal">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleInputChange}
                />
                {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
                <button type="submit">Login</button>
                <button onClick={handleRegisterOpen}>Register</button>
              </form>
            </div>
          )
        )}
        {isRegisterOpen && (
          <div className="register-modal">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={handleInputChange}
              />
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={handleInputChange}
              />
              {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
              <button type="submit">Register</button>
              <button onClick={handleRegisterClose}>Close</button>
            </form>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;