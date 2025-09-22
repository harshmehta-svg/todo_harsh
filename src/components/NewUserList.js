// src/components/NewUserList.js

import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import UserServiceApi from '../services/UserServiceApi';

const NewUserList = () => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    get_users();
  }, []);

  const get_users = async () => {
    try {
      const response = await UserServiceApi.get_users();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const data = { username: newUsername, email: newEmail, phone: newPhone };
    UserService.addUser(data)
      .then((response) => {
        get_users();
        setNewUsername('');
        setNewEmail('');
        setNewPhone('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>New User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username} - {user.email} - {user.phone}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          value={newUsername}
          placeholder="Username"
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          value={newEmail}
          placeholder="Email"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={newPhone}
          placeholder="Phone Number"
          onChange={(e) => setNewPhone(e.target.value)}
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default NewUserList;