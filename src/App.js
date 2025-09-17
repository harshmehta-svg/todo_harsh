// @flow

import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [signupStatus, setsignupStatus] = useState(false());

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

  const handleSignup = (event:SyntheticEvent) => {
    event.preventDefault();
    setsignupStatus(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}! <button onClick={handleLogout}>Logout</button>
          </h2>
        ) : (
          signupStatus === false && (
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
              /><button onClick={handleSignup} type="button" style={{marginInlineStart: '5px'}}>Switch to Sign-up</button>
              <button type="submit">Login</button>
            </form>
          )
        )}
        {signupStatus === true &&
          <form onSubmit={(e) => console.log("Sign up button clicked", username, password)}
          >
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
            <button type="submit" style={{background:'blue', color: 'white'}}>Sign up</button>
            <button onClick={() => setsignupStatus(false)} style={{background:'blue', color: 'white'}}>Cancel</button>
          </form>
          }
      </header>
    </div>
  );
}

export default App;