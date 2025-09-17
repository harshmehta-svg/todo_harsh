// @flow
import React, { useState } from 'react';
import './App.css';
import './Login.css'; // Add this line to import the new login styles

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
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}! <button onClick={handleLogout}>Logout</button>
          </h2>
        ) : (
          loginStatus === false && (
            <button onClick={() => setLoginStatus(true)}>Login</button> // Add this line to toggle the login form appearance
            <LoginStatus isOpen={loginStatus} /> // Add this line to display the login status
          )
        )}
      </header>
      {loginStatus === true && ( // Check this condition to display the login form
        <div className="login-form">
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
      )}
      <footer className="App-footer">
        <p>Todo App</p>
      </footer>
    </div>
  );
}

export default App;

// Add this new component to handle the login status display
function LoginStatus({ isOpen }) {
  if (isOpen) {
    return <h2>Login Status: Please enter your credentials to continue</h2>;
  } else {
    return null;
  }
}


// Add this new function to handle the login form styling
function useLoginStyles() {
 const loginStatus = useState(false); // Declare the loginStatus state for the component
 const [loginStyles, setLoginStyles] = loginStyles;

 const handleLoginStyles = () => {
    if (loginStatus[0] === true) {
      setLoginStyles('login-form');
    } else {
      setLoginStyles('hide');
    }
  };

  useEffect(() => {
    handleLoginStyles();
  }, [loginStatus]);

  return [loginStyles];
}



// Add these missing imports
import { useEffect } from 'react';

// Add this new import for the styles
import './Login.css';