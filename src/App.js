// @flow

import React, { useState } from 'react';
import './App.css';
import Login from './Login'; // Importing the newly created Login component

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
      <header className="App-header">
        <nav className="flex justify-between items-center mb-4">
          <a href="#" className="font-bold text-lg">
            Todo App
          </a>
          <ul className="flex items-center">
            <li className="mr-4">
              <a href="#" 
                 className="text-gray-600 hover:text-gray-900"
                 aria-current="page"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a href="#"
                 className="text-gray-600 hover:text-gray-900"
                 aria-current="page"
              >
                Features
              </a>
            </li>
          </ul>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to login
        </button>
        {isLoggedIn === true ? (
          <h2 className="text-2xl">
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
      <login-link href="/login" className="mt-4 mb-8 block text-blue-500 hover:text-blue-800">
        Need an account?
      </login-link>

      <Login />
    </div>
  );
}

export default App;