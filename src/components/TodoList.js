import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = async () => {
    if (username !== '' && password !== '') {
      const response = await axios.post('/login', {
        username,
        password,
      });
      if (response.data.success) {
        setIsLogged(true);
      } else {
        setError(response.data.message);
      }
    } else {
      setError('Please fill in both username and password');
    }
  };

  const handleRegister = async () => {
    if (username !== '' && password !== '') {
      const response = await axios.post('/register', {
        username,
        password,
      });
      if (response.data.success) {
        setIsLogged(true);
        setError('');
      } else {
        setError(response.data.message);
      }
    } else {
      setError('Please fill in both username and password');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('username')) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
};

export default TodoList;