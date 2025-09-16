// src/pages/Login.js

import React from 'react';
import './Login.css';

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // API Call to authenticate the user (example for demonstration)
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          // Successful login, redirect to protected page
          window.location.pathname = '/tasks';
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;