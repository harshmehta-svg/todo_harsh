// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { protectRoute } from './middleware/auth';
import { Link, useHistory} from 'react-router-dom'; // add import

const app = express();

const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 8),
  },
];

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json('Please fill all fields');
  if (users.find((user) => user.username === username)) return res.status(400).json('Username already exists');
  if (!validateEmail(email)) return res.status(400).json('Invalid email');
  if (!validatePassword(password)) return res.status(400).json('Password must be at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
  };
  users.push(user);
  return res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json('Please fill all fields');
  const user = users.find((user) => user.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid email or password', message: 'Please check your email and password' });
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) return res.status(401).json({ error: 'Invalid email or password', message: 'Please check your email and password' });
  const token = jwt.sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '1h' });
  return res.json({ token });
};

// Rest of the code remains unchanged until this point

const registerUser = async (event) => {
  event.preventDefault();
  const { username, email, password } = { username, email: '', password };
  try {
    const registerResponse = await axios.post(`http://localhost:3000/register`, { username, email, password });
    // Save JWT in local storage on successful login
    localStorage.setItem('token', registerResponse.data.token);
    return registerResponse;
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (event) => {
  event.preventDefault();
  const { email, password } = { email, password };
  try {
    const loginResponse = await axios.post(`http://localhost:3000/login`, { email, password });
    localStorage.setItem('token', loginResponse.data.token);
    setIsLoggedIn(true);
    setLoginStatus(true);
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      alert('Invalid email or password');
    }
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  setLoginStatus(false);
  API = null;
};

// Protected route to store username and profile information
const profile = protectRoute(async (req, res) => {
  const id = req.user.id;
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

const App = () => {
  const history = useHistory(); // add import
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  const [ loginStatus, setLoginStatus] = useState(false);
  const [ API, setAPI] = useState(null);

  return (
    <div>
      <h1>Todo List App</h1>
      <Link to="/register" style={{ margin: '10px' }}>Register</Link>
      <Link to="/login" style={{ margin: '10px' }}>Login</Link>
      <ul>
        {loginStatus && isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <button onClick={() => history.push('/login')}>Login</button>
          </li>
        )}
      </ul>
      <button onClick={loginUser}>Login</button>
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

// ... rest of the code remains the same

export default App;