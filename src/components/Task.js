// New file

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Task() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setIsError(true);
    } else {
      // API Call to register user
      // For demonstration purposes, this function will be empty
      // In a real application, this function should register the user in the database
      const registerUser = async () => {
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              firstName,
              lastName,
            }),
          });
          if (response.status === 201) {
            setIsSuccess(true);
            navigate('/login');
          } else {
            setIsError(true);
          }
        } catch (error) {
          console.error(error);
          setIsError(true);
        }
      };
      registerUser();
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Signup Page</h1>
      </header>
      <main className="main-content">
        {isError && <div className="error">Error registering user</div>}
        {isSuccess && <div className="success">User registered successfully</div>}
        <form onSubmit={handleSignup}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
          <div>
            <label>Re-enter Password:</label>
            <input
              type="password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              placeholder="Enter Password Again"
            />
          </div>
          <button type="submit">Signup</button>
        </form>
      </main>
    </div>
  );
}

export default Task;