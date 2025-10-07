// @flow

import React, { useState } from 'react';
import './App.css';
import Button from './components/Button'; // Import modified Button component
import { useDispatch, useSelector } from 'react-redux';
import { store, actionCreators } from './store';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  const handleLogin = (event:SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
      dispatch(actionCreators.setUser(username));
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
    dispatch(actionCreators.setUser(null));
  };

  const handleButtonClick = (buttonLabel, page, userInfo) => {
    dispatch(actionCreators.sendEvent('button-clicked', { buttonLabel, page, userId: userInfo }));
    console.log('Button clicked:', { buttonLabel, page, user: userInfo });
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}!{' '}
            <Button
              label="Logout"
              page="logout"
              userId={username}
              onClick={() => handleLogout()}
            />{' '}
            <Button
              label="Click"
              page="home"
              userId={username}
              onClick={() => handleButtonClick('Click', 'home', username)}
            />
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