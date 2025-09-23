// @flow

import React, { useState } from 'react';
import './App.css';

function UserList() {
  const [users, setUsers] = useState([
    { id: 1, username: 'John Doe', email: 'john@example.com', phone: '1234567890' },
    { id: 2, username: 'Jane Doe', email: 'jane@example.com', phone: '9876543210' },
  ]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={(event) => {
        event.preventDefault();
        const newUsername = event.target.username.value;
        const newEmail = event.target.email.value;
        const newPhone = event.target.phone.value;
        const newUser = { id: users.length + 1, username: newUsername, email: newEmail, phone: newPhone };
        addUser(newUser);
        event.target.reset();
      }}>
        <label>Username:</label>
        <input type="text" name="username" />
        <br />
        <label>Email:</label>
        <input type="email" name="email" />
        <br />
        <label>Phone Number:</label>
        <input type="tel" name="phone" />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

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
          <div>
            <h2>
              Welcome, {username}! <button onClick={handleLogout}>Logout</button>
            </h2>
            <UserList />
          </div>
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