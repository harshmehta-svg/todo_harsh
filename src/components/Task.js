// New file

import React, { useState } from 'react';
import './Task.css';

function Task() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('authenticated', 'true');
      window.location.href = '/tasks';
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      {loginError && (
        <div style={{ color: 'red' }}>{loginError}</div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Task;