import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleInputChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    const apiCall = async () => {
      try {
        const response = await axios.post('/api/login', {
          username,
          password,
        });
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    apiCall();
  };

  const validateForm = () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Logging in...</div>}
      {userData && (
        <div className="success-message">Welcome, {userData.username}!</div>
      )}
      <input
        type="text"
        value={username}
        onChange={handleInputChange}
        name="username"
        placeholder="Username"
        className="inputfield"
      />
      <input
        type="password"
        value={password}
        onChange={handleInputChange}
        name="password"
        placeholder="Password"
        className="inputfield"
      />
      <button type="submit" className="submit-button">
        Log In
      </button>
    </form>
  );
}

export default LoginForm;