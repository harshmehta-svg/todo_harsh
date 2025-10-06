// @flow

import React, { useState, useEffect } from 'react';
import analytics from 'lib/analytics';
import './App.css';
import { useAnalytics } from './hooks/useAnalytics.js';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const globalContext = {
    user: {
      id: 1,
      name: 'John Doe',
    },
    company: {
      id: 1,
      name: 'ABC Company',
    },
    region: {
      id: 1,
      name: 'North America',
    },
  };

  const handleLogin = (event: any) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
      useAnalytics.track('Login Successful', {
        user: globalContext.user,
        company: globalContext.company,
        region: globalContext.region,
      });
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
    useAnalytics.track('Logout');
  };

  useEffect(() => {
    useAnalytics.init(globalContext);
  }, [globalContext]);

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
    </div>
  );
}

export default App;