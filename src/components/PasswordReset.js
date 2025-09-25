// New file

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [resetLink, setResetLink] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      passwordRegex = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;

    if (emailRegex.test(email)) {
      axios.post('/auth/requestpasswordreset', { email })
        .then(response => {
          setResetLink(response.data.resetLink);
          setRequestSent(true);
        })
        .catch(error => {
          setErrors({ resetError: error.response.data });
        });
    } else {
      setErrors({ emailError: 'Invalid email address' });
    }
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    const newPasswordRegex = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;

    if (newPasswordRegex.test(event.target.elements.newPassword.value)) {
      axios.post('/auth/resetpassword', {
        resetLink,
        newPassword: event.target.elements.newPassword.value
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          setErrors({ resetError: error.response.data });
        });
    } else {
      setErrors({ newPasswordError: 'Password must be at least 8 characters long' });
    }
  };

  return (
    <>
      {requestSent ? (
        <form onSubmit={handleResetSubmit}>
          <h2>Reset Password</h2>
          <input
            type="password"
            required
            placeholder="New Password"
            name="newPassword"
          />
          <input
            type="password"
            required
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <button type="submit">Reset</button>
          {errors.newPasswordError && (
            <p style={{ color: 'red' }}>{errors.newPasswordError}</p>
          )}
          {errors.resetError && (
            <p style={{ color: 'red' }}>{errors.resetError}</p>
          )}
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Password Reset Request</h2>
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={handleInputChange}
            name="email"
          />
          <button type="submit">Request Password Reset</button>
          {errors.emailError && (
            <p style={{ color: 'red' }}>{errors.emailError}</p>
          )}
          {errors.resetError && (
            <p style={{ color: 'red' }}>{errors.resetError}</p>
          )}
        </form>
      )}
    </>
  );
};

export default PasswordReset;
