// auth.js
// New file

import axios from 'axios';
import { useHistory, redirect } from 'react-router-dom';

const api = axios.create({
  baseURL: 'https://your-auth-api.com/api/auth',
});

const signup = async (data) => {
  try {
    const response = await api.post('/users', data);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Error creating user');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { signup };

const login = async (data) => {
  try {
    const response = await api.post('/users/login', data);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login };

const forgetPassword = async (email) => {
  try {
    const response = await api.post('/users/forget-password', { email });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error sending password reset mail');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { forgetPassword };

const resetPassword = async (data) => {
  try {
    const response = await api.post('/users/reset-password', data);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error resetting password');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { resetPassword };

const validateUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { validateUser };

const checkIfUsernameExists = async (username) => {
  try {
    const response = await api.get(`/users/is-username-available/${username}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { checkIfUsernameExists };