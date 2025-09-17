// @flow

import React, { useState } from 'react';
import './App.css';
import './Login.css'; // Importing the new login CSS file

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

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

  const handleOpenLogin = () => {
    document.getElementById('login-modal').style.display = 'block';
  };

  const handleCloseLogin = () => {
    document.getElementById('login-modal').style.display = 'none';
  };

  const login = () => {
    // Close the login modal
    handleCloseLogin();
    handleLogin(event); // Submit the form
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}!
            <button onClick={handleLogout}>Logout</button>
          </h2>
        ) : (
          loginStatus === false && (
            <button onClick={handleOpenLogin}>Login</button>
          )
        )}
        {/* Adding the modal element for the login form*/}
        <div id="login-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseLogin}>
              &times;
            </span>
            <form onSubmit={login}>
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
              <button
                type="button"
                onClick={handleCloseLogin}
                style={{ float: 'right' }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;