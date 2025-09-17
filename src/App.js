// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route exact path="/login">
            <header className="App-header">
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
            </header>
          </Route>
          <Route exact path="/logout">
            <header className="App-header">
              <button onClick={handleLogout}>Logout successfully</button>
            </header>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;