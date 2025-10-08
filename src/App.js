// @flow

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  const handleLogin = (event:SyntheticEvent) => {
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

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('/api/me');
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event:SyntheticEvent) => {
    event.preventDefault();
    axios.put('/api/me', userDetails)
      .then(() => {
        console.log('User details updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserDetails();
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
            <form onSubmit={handleLogin}>
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
      {isLoggedIn === true && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            value={userDetails.name || ''}
            onChange={(event) => {
              setUserDetails({ ...userDetails, name: event.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Enter email"
            value={userDetails.email || ''}
            onChange={(event) => {
              setUserDetails({ ...userDetails, email: event.target.value });
            }}
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default App;