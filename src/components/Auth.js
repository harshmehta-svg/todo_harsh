// src/components/Auth.js

import React from 'react';
import axios from 'axios';

// Functional component to handle form submission
function LoginPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth', {
        username,
        password,
      });
      setIsAuthenticated(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError('Invalid username or password');
    }
  };

  // Render the login form
  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <br />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
        <a href="/register">Register</a>
        {isAuthenticated && <p>You are now logged in!</p>}
      </form>
    </div>
  );
}

export default LoginPage;