// @flow

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/AdminPanel';

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

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/admin">
              {isLoggedIn ? (
                <AdminPanel username={username} onLogout={handleLogout} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route exact path="/">
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
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;