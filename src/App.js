// @flow

import React, { useState, createContext, useContext } from 'react';
import './App.css';

// Context API
const ThemeContext = createContext();

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className="App relative">
        <header className="App-header absolute top-0 left-0 w-full py-4 flex justify-between items-center bg-white dark:bg-gray-800">
          <button onClick={toggleDarkMode} className="text-gray-600 dark:text-white">
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </button>
          <nav className="flex gap-2 font-bold text-gray-600 dark:text-white">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          {isLoggedIn === true ? (
            <h2 className="text-2xl">
              Welcome, {username}! <button onClick={handleLogout}>Logout</button>
            </h2>
          ) : (
            loginStatus === false && (
              <form onSubmit={handleLogin} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="p-2 pl-10 text-gray-600 dark:text-white"
                />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="p-2 pl-10 text-gray-600 dark:text-white"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </form>
            )
          )}
        </header>
        <aside className="absolute top-0 left-0 h-screen w-64 bg-gray-200 dark:bg-gray-800 shadow-md overflow-y-auto">
          <h2 className="text-2xl py-4 font-bold text-gray-600 dark:text-white">
            Navigation
          </h2>
          <ul className="ml-4">
            <li className="py-2">
              <a href="#" className="text-gray-600 dark:text-white hover:text-gray-900">
                Home
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-gray-600 dark:text-white hover:text-gray-900">
                About
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-gray-600 dark:text-white hover:text-gray-900">
                Contact
              </a>
            </li>
          </ul>
        </aside>
        <main className="mx-4 my-4">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-white">
            Main Content
          </h2>
          <p className="text-gray-600 dark:text-white">
            This is main content area.
          </p>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

// Theme Context API
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { useTheme };