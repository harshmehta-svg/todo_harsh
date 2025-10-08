// New file

import React from 'react';
import './login.css';

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleDarkMode = () => {
    localStorage.setItem('darkMode', darkMode);
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode', darkMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Authentication logic goes here
    if (username === 'admin' && password === 'password') {
      // User authenticated successfully
      window.location.href = '/tasks';
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={'login-page ' + (darkMode ? 'dark-mode' : '')}>
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="username-input">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="password-input">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <label className="checkbox-label">
          <input type="checkbox" checked={darkMode} onChange={handleDarkMode} />
          Dark Mode
        </label>
      </form>
      <div className="footer">
        <p>Copyright 2024 Todo List App</p>
      </div>
    </div>
  );
}

export default Login;