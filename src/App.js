// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import TextStreamComponent from './TextStreamComponent'; // new import

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [aiText, setAiText] = useState(''); // new state
  const [loading, setLoading] = useState(false); // new state

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => { // simulate streaming
      setLoading(false);
      setAiText('T'); // T
      setTimeout(() => {
        setAiText('He'); // He
        setTimeout(() => {
          setAiText('ll'); // ll
          setTimeout(() => {
            setAiText('o'); // o
            setTimeout(() => {
              setAiText('!'); // !
              setTimeout(() => {
                setAiText(''); // reset
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="App-body">
        <TextStreamComponent text={aiText} loading={loading} /> {/* render TextStreamComponent */}
      </div>
    </div>
  );
}

export default App;