// New file

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Existing code remains unchanged
const apiPrefix = '/api';
const authEndpoint = `${apiPrefix}/me`;

export const useAuth = () => {
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await axios.post(`${apiPrefix}/login`, data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(authEndpoint, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateUser = async (data) => {
    try {
      const response = await axios.put(`${apiPrefix}/user`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { login, logout, getUser, updateUser };
};

// ProfileForm implementation
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

const ProfileForm = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { getUser, updateUser } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    loadUser();
  }, [getUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updateUserResponse = await updateUser(event.target);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={user.username} disabled />
      </label>
      <label>
        Email:
        <input type="email" value={user.email} disabled />
      </label>
      <label>
        Bio:
        <input type="text" value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfileForm;