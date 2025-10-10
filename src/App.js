// @flow

import React, { useState } from 'react';
import './App.css';
import { Link, withRouter } from 'react-router-dom'; // ADDED IMPORT

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
 );

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  const isUserAdmin = () => {
    return isAdmin && isAdmin === true;
  };
  const isAdmin = true; // FOR DEMONSTRATION PURPOSES - PLEASE UPDATE WITH ACTUAL ADMIN CHECK

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
      <nav>
        <ul>
          {isUserAdmin() ? (
            <li>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </li>
          ) : null}
          {isUserAdmin() ? (
            <li>
              <Link to="/admin/settings">Admin Settings</Link>
            </li>
          ) : null}
        </ul>
      </nav>
      {isLoggedIn === true && isUserAdmin() && <Route path="/admin/dashboard" render={() => <h1>Admin Dashboard</h1>} />} {/* ADDED ROUTE WITH ADMIN RESTRICTION */}
      {isLoggedIn === true && isUserAdmin() && <Route path="/admin/settings" render={() => <h1>Admin Settings</h1>} />} {/* ADDED ROUTE WITH ADMIN RESTRICTION */}
    </div>
  );
}

function isAdminCheck(Comp) {
  const isUserAdmin = () => {
    return isAdmin && isAdmin === true;
  };
  const isAdmin = true; // FOR DEMONSTRATION PURPOSES - PLEASE UPDATE WITH ACTUAL ADMIN CHECK
  return function (props) {
    return isUserAdmin() ? <Comp {...props} /> : null;
  };
}

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAdmin() ? <Component {...props} /> : <h1>You do not have access to this page.</h1> 
      }
    />
  );
}

export default App;