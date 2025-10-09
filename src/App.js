// @flow
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Custom hook to handle HTTP requests with caching
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState({});

  useEffect(() => {
    // Check if the data is cached
    if (cache[url]) {
      setData(cache[url].data);
      setError(cache[url].error);
      setLoading(false);
    } else {
      setLoading(true);
      setError(null);
      axios.get(url)
        .then((response) => {
          setData(response.data);
          setCache((prevCache) => ({ ...prevCache, [url]: { data: response.data, error: null } }));
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setCache((prevCache) => ({ ...prevCache, [url]: { data: null, error: error.message } }));
          setLoading(false);
        });
    }
  }, [url]);

  return [data, loading, error];
}

function App() {
  // Authentication state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Use the useFetch hook to fetch data from the API
  const [ userData, loading, error ] = useFetch('https://jsonplaceholder.typicode.com/users');
  const [posts, loadingPosts, errorPosts ] = useFetch('https://jsonplaceholder.typicode.com/posts');

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
        {isLoggedIn === true ? (
          <h2>
            Welcome, users! <button onClick={handleLogout}>Logout</button>
            <ul>
            {loading ?
                  'Loading...':
                  userData.map((user, index) => <li key={index}>{user.name}</li>)
            }
              </ul>
              <ul>
            {loadingPosts ?
                  'Loading...':
                  posts.map((post, index) => <li key={index}>{post.title}</li>)
            }
              </ul>
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
    </div>
  );
}

export default App;