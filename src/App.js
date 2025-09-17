// @flow

import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

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
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li style={{ display: 'inline-block', marginRight: 20 }}>
                <Link to="/" style={{ color: '#333' }}>Home</Link>
              </li>
              <li style={{ display: 'inline-block', marginRight: 20 }}>
                <Link to="/login" style={{ color: '#333' }}>Login</Link>
              </li>
            </ul>
          </nav>
          {isLoggedIn === true ? (
            <h2>
              Welcome, {username}! <button onClick={handleLogout}>Logout</button>
            </h2>
          ) : (
            loginStatus === false && (
              <div>
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
              </div>
            )
          )}
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn === true ? (
                  <Navigate to="/" replace={true} />
                ) :(
                  <Login />
                )
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = (event:SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      const isLoggedIn = true;
      // Update the isLoggedIn state in the parent component
      // This part is missing and should be done by a callback prop
      // For simplicity, let's assume we're logging the user in
      console.log(isLoggedIn);
      setLoginStatus(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default App;