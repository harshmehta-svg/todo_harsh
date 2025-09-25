// New file

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Function component
function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');

  const history = useHistory();

  const handleLogoutClick = () => {
    localStorage.removeItem('jwtToken');
    history.push('/');
  };

  const onReset = e => {
    e.preventDefault();
    if (resetEmail) {
      axios.post(`${process.env.REACT_APP_API_URL}/auth/reset/init`, { email: resetEmail })
        .then((response) => {
          setResetError('');
          history.push(`/reset/${response.data.key}`);
        })
        .catch((error) => {
          setResetError('Failed to send reset password request.');
          history.push('/login');
        });
    } else {
      setResetError('Please enter your email address.');
    }
  };

  const onChange = e => {
    setResetError('');
    setResetEmail(e.target.value);
  };

  const onConfirmPassword = () => {
    if (password === confirmPassword) {
      // handle successful password confirmation
    } else {
      // handle password mismatch
    }
  };

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      history.push('/todo');
    }
  }, [history]);

  return (
    <main className="login-page">
      <div className="container login-content login-style-2">
        <h2>Sign Up</h2>
        <form>
          <label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          </label>
          <br />
          <label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          </label>
          <br />
          <label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          </label>
          <br />
          <label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          </label>
          <br />
          <button type="submit" onClick={() => history.push('/todo')} disabled={!username || !email || !password || !confirmPassword}>
            Sign Up
          </button>
          <button type="submit" onClick={onReset}>
            Forgot Password
          </button>
          <br />
          <label>
            <input type="email" value={resetEmail} onChange={onChange} placeholder="Reset Email" />
          </label>
          <button type="submit" onClick={onReset}>
            Reset
          </button>
          {resetError && <p className="error-message">{resetError}</p>}
          <button type="submit" onClick={handleLogoutClick}>
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignUp;