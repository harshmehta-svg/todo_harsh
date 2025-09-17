// @flow

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogin = (event: SyntheticEvent) => {
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

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      setLoginStatus(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}! <button onClick={handleLogout}>Logout</button>
          </h2>
        ) : (
          loginStatus === false && (
            <form onSubmit={handleLogin} id="login-form">
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
      </header>

      <div id="register-form" style={{ display: 'none' }}>
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Enter username" />
          <input type="password" placeholder="Enter password" />
          <input type="password" placeholder="Confirm password" />
          <button>Create Account</button>
        </form>
      </div>

      <div id="forgot-password-form" style={{ display: 'none' }}>
        <h2>Forgot Password</h2>
        <form>
          <input type="email" placeholder="Enter email" />
          <button>Send Password Reset Link</button>
        </form>
      </div>

      <button
        id="login-register-toggle-btn"
        onClick={() => {
          const loginForm = document.getElementById('login-form');
          const registerForm = document.getElementById('register-form');
          const forgotPasswordForm = document.getElementById(
            'forgot-password-form',
          );

          if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            forgotPasswordForm.style.display = 'none';
            const btns = document.querySelectorAll('.form-switch-btn');
            btns.forEach((btn) => btn.style.background = 'none');
            const loginRegisterToggleButton = document.getElementById(
              'login-register-toggle-btn',
            );
            loginRegisterToggleButton.textContent = 'Switch to Register';

            const registerButton = document.getElementById('register-btn');
            registerButton.style.display = 'block';

            const forgotPasswordButton = document.getElementById(
              'forgot-password-btn',
            );
            forgotPasswordButton.style.display = 'none';
          } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            forgotPasswordForm.style.display = 'none';
            const btns = document.querySelectorAll('.form-switch-btn');
            btns.forEach((btn) => btn.style.background = 'none');
            loginRegisterToggleButton.textContent =
              'Switch to Login';

            const registerButton = document.getElementById('register-btn');
            registerButton.style.display = 'none';

            const forgotPasswordButton = document.getElementById(
              'forgot-password-btn',
            );
            forgotPasswordButton.style.display = 'block';
          }
        }}
        className="form-switch-btn"
      >
        Switch to Register/Login
      </button>

      <button
        id="register-btn"
        onClick={() => {
          const loginForm = document.getElementById('login-form');
          const registerForm = document.getElementById('register-form');
          const forgotPasswordForm = document.getElementById(
            'forgot-password-form',
          );

          if (registerForm.style.display === 'none') {
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
            forgotPasswordForm.style.display = 'none';
            const btns = document.querySelectorAll('.form-switch-btn');
            btns.forEach((btn) => btn.style.background = 'none');
            const loginRegisterToggleButton = document.getElementById(
              'login-register-toggle-btn',
            );
            loginRegisterToggleButton.textContent = 'Switch to Login';

            const registerButton = document.getElementById('register-btn');
            registerButton.style.display = 'none';

            const forgotPasswordButton = document.getElementById(
              'forgot-password-btn',
            );
            forgotPasswordButton.style.display = 'block';
          } else {
            registerForm.style.display = 'none';
            loginForm.style.display = 'none';
            forgotPasswordForm.style.display = 'block';
            const btns = document.querySelectorAll('.form-switch-btn');
            btns.forEach((btn) => btn.style.background = 'none');
            const loginRegisterToggleButton = document.getElementById(
              'login-register-toggle-btn',
            );
            loginRegisterToggleButton.textContent =
              'Switch to Login/Register';

            const registerButton = document.getElementById('register-btn');
            registerButton.style.display = 'none';

            const forgotPasswordButton = document.getElementById(
              'forgot-password-btn',
            );
            forgotPasswordButton.style.display = 'none';
          }
        }}
        className="form-switch-btn"
      >
        Switch to Forgot Password
      </button>

      <button
        id="forgot-password-btn"
        onClick={() => {
          const loginForm = document.getElementById('login-form');
          const registerForm = document.getElementById('register-form');
          const forgotPasswordForm = document.getElementById(
            'forgot-password-form',
          );

          if (forgotPasswordForm.style.display === 'none') {
            forgotPasswordForm.style.display = 'block';
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            const btns = document.querySelectorAll('.form-switch-btn');
            btns.forEach((btn) => btn.style.background = 'none');
            const loginRegisterToggleButton = document.getElementById(
              'login-register-toggle-btn',
            );
            loginRegisterToggleButton.textContent =
              'Switch to Login/Register';

            const registerButton = document.getElementById('register-btn');
            registerButton.style.display = 'none';

            const forgotPasswordButton = document.getElementById(
              'forgot-password-btn',
            );
            forgotPasswordButton.style.display = 'none';
          } else {
            forgotPasswordForm.style.display = 'none';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            const btns = document.querySelectorAll('.form-switch-btn');
            btns.forEach((btn) => btn.style.background = 'none');
            const loginRegisterToggleButton = document.getElementById(
              'login-register-toggle-btn',
            );
            loginRegisterToggleButton.textContent = 'Switch to Register';

            const registerButton = document.getElementById('register-btn');
            registerButton.style.display = 'block';

            const forgotPasswordButton = document.getElementById(
              'forgot-password-btn',
            );
            forgotPasswordButton.style.display = 'none';
          }
        }}
        className="form-switch-btn"
      >
        Switch to Login/Register
      </button>
    </div>
  );

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    }
  }, [isLoggedIn]);
}

export default App;