import React, { useState, useEffect } from 'react';
import './App.css';
import './Login.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
      setRedirectToHome(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  useEffect(() => {
    if (redirectToHome) {
      window.location.href = '/';
    }
  }, [redirectToHome]);

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
        {loginStatus === true &&
          isLoggedIn === null && (
            <div className="nav-link">
              <p>Don't have an account?</p> <a href="/register">Sign Up</a>
            </div>
          )}
      </header>
      <div className="links">
        <a href="/Login">Login</a>
        <p>or</p>
        <a href="/register">Register</a>
      </div>
    </div>
  );
}

export default App;