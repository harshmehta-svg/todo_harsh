// @flow

import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (event:SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
      navigate('/', { replace: true });
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
    navigate('/', { replace: true });
  }

  const protectedRoutes = () => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return isLoggedIn;
  }

  useEffect(() => {
    const adminOnlyRoutes = [
      <Route
        path="/admin"
        element={isLoggedIn && <Navigate to="/admin/dashboard" />}
      />
      <Route
        path="/admin/dashboard"
        element={isLoggedIn && (
          <div >
            <h2>
              Admin Dashboard
            </h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      >
      </Route>
    ];
    return () => {}
  }, [isLoggedIn])

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          {isLoggedIn === true ? (
            <Route
              path="/"
              element={(
                <>
                  <h2>
                    Welcome, {username}! <button onClick={handleLogout}>Logout</button>
                  </h2>
                </>
              )}
            />
          ) : (
            loginStatus === false && (
              <Route
                path="/"
                element={(
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
                )}
              />
            )
          )}
          {isLoggedIn === true ? (

            <Route
              path="/admin/dashboard"
              element={(
                isLoggedIn && <div >
                  <h2>
                    Admin Dashboard
                  </h2>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            />
          ) : (
            // Do nothing
          )}
        </Routes>
      </header>
    </div>
  );
}

export default App;