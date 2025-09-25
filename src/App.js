// @flow

import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Email from 'emailjs-com';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);

  const handleLogin = (event: any) => {
    event.preventDefault();
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      setLoginStatus(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  const handlePasswordReset = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    axios
      .get(`https://your-email-service.com/api/generate-token/${email}`)
      .then((response) => {
        setToken(response.data.token);
        setPasswordReset(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitToken = (event: any) => {
    event.preventDefault();
    if (!token || !password) {
      alert("Please enter token and new password");
      return;
    }
    axios
      .post("https://your-email-service.com/api/reset-password", {
        token: token,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          setIsLoggedIn(true);
          setLoginStatus(true);
          setToken("");
          setPassword("");
        } else {
          alert("Password reset failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}!{" "}
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
        {passwordReset === true && (
          <form onSubmit={handleSubmitToken}>
            <input
              type="text"
              placeholder="Enter token"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Reset Password</button>
            <button onClick={() => setPasswordReset(false)}>Cancel</button>
          </form>
        )}
        <button onClick={handlePasswordReset}>Forgot Password</button>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </header>
    </div>
  );
}

export default App;