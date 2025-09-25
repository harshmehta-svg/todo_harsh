// @flow

import React, { useState } from 'react';
import "./App.css";
// Import the Signup component
import Signup from './Signup'; // Assuming the Signup component is in the same directory

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

  // Add a new route for the Signup page
  const handleSignup = () => {
    // Redirect to the Signup route
    window.location.pathname = '/signup';
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
              <br/>
              <br/>
              <button onClick={handleSignup}>Signup</button>
            </form>
          )
        )}
      </header>
      { isLoggedIn === false && window.location.pathname === '/' && (
        <Signup />
      )}
    </div>
  );
}

export default App;

Please note: 
- A new route '/signup' has been added to handle the Signup component. 
- A 'Signup' button has been added in the login form to redirect the user to the Signup page.
- The 'Signup' component will be rendered when the user is not logged in and the URL is the root '/'