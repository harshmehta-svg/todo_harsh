// src/components/AuthForm.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AuthForm(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      // signup logic here
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // API call for signup
      fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Signed up successfully');
            history.push('/login');
          } else {
            alert(data.error);
          }
        })
        .catch((error) => console.error(error));
    } else {
      // login logic here
      // API call for login
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Logged in successfully');
            history.push('/dashboard');
          } else {
            alert(data.error);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'isSignUp') {
      setIsSignUp(value === 'true');
    } else if (name === 'username' || name === 'email' || name === 'password' || name === 'confirmPassword') {
      if (name === 'password' && value.length < 8) {
        alert('Password must be at least 8 characters long');
      } else if (name === 'password' && value !== confirmPassword) {
        alert('Passwords do not match');
      } else {
        console.log(name, value);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Is Signup:
          <input
            type="checkbox"
            name="isSignUp"
            checked={isSignUp}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">{isSignUp ? 'Signup' : 'Login'}</button>
      </form>
    </div>
  );
}

export default AuthForm;