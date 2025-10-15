// @flow

import React, { useState } from 'react';
import './App.css';
import Pagination from './components/Pagination'; // Import Pagination component

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [totalPages, setTotalPages] = useState(10); // Add state for total pages
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page

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

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
      <main className="App-content">
        {/* Content will go here */}
      </main>
      <footer className="App-footer">
        <Pagination
          total={totalPages} // Pass total pages to Pagination component
          currentPage={currentPage} // Pass current page to Pagination component
          onChange={handlePageChange} // Pass handlePageChange function to Pagination component
        />
      </footer>
    </div>
  );
}

// Props for the Pagination component
type Props = {
  total: number,
  currentPage: number,
  onChange: (newPage: number) => void,
};

export default App;