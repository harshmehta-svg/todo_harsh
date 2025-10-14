// @flow

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/');

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

  useEffect(() => {
    const currentRoute = window.location.pathname;
    setActiveRoute(currentRoute);
  }, [activeRoute]);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const currentRoute = window.location.pathname;
    setActiveRoute(currentRoute);
  }, [activeRoute]);

  const routes = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Dashboard', path: '/dashboard' },
    { id: 3, name: 'Users', path: '/users' },
  ];

  return (
    <div className={`App ${!sidebarExpanded ? 'sidebar-expanded' : ''} ${darkMode ? 'dark-mode' : ''}`}>
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
        <button className={`toggle-dark-mode ${darkMode ? 'dark-mode-active' : ''}`} onClick={handleDarkModeToggle}>Toggle Dark Mode</button>
      </header>
      <div className={`sidebar ${!sidebarExpanded ? 'expanded' : ''}`}>
        <button onClick={handleSidebarToggle}>Toggle Sidebar</button>
        <ul>
          {routes.map((route) => (
            <li key={route.id}>
              <a
                className={activeRoute === route.path ? `link ${darkMode ? 'dark-link' : ''}` : ''}
                href={route.path}
              >
                {route.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;