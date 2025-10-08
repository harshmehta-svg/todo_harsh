// src/ProfileForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Function to handle form submission
const onSubmit = async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.put('/api/me', {
      name,
      email,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// ProfileForm function
function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/me');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Name:
          <input
            id="name"
            type="text"
            value={user.name}
            onChange={(event) => {
              setUser({ ...user, name: event.target.value });
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(event) => {
              setUser({ ...user, email: event.target.value });
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
        </label>
      </div>
      <input type="submit" value="Save" />
    </form>
  );
}

export default ProfileForm;