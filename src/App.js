import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'tanstack-query-client';
import './App.css';
import ProductList from './components/ProductList';

// Create client
const queryClient = new QueryClient();

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        // fetch more products
      }
    }, {
      rootMargin: '50px',
    });

    // observe the container
    observer.observe(document.getElementById('product-list'));

    return () => {
      observer.unobserve(document.getElementById('product-list'));
    };
  }, []);

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
      <QueryClientProvider client={queryClient}>
        <ProductList initialItems={10} />
      </QueryClientProvider>
    </div>
  );
}

export default App;