// @flow

import React, { useState, useContext } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useDarkMode } from 'usehooks-ts';

const queryClient = new QueryClient();

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { theme, setTheme } = useDarkMode();

  const { data, isLoading, error, refetch } = useQuery(['posts'], async () => {
    const response = await fetch('/api/posts');
    return response.json();
  }, {
    staleTime: 100000, // 100 seconds
    cacheTime: 200000, // 200 seconds
  });

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}!{' '}
            <button onClick={handleLogout}>Logout</button>
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
        <>
          <button onClick={toggleTheme}> Toggle Theme </button>
        </>
      </header>
      <p>
        posts is <strong>still</strong> loading :{' '}
        {isLoading ? 'Yup' : 'Nope'}
      </p>
      <p>{error}</p>
      <button onClick={refetch}>REFETCH posts</button>
      {data && <p> data {JSON.stringify(data)}</p>}
    </div>
  );
}

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};