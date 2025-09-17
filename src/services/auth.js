// src/services/auth.js

import * as jwt from 'jsonwebtoken';

// Existing code remains unchanged
let authUser = null;
let authUserToken = null;

export function login(userInfo) {
  // Authentication logic
  const storedUsers = JSON.parse(localStorage.getItem('users'));

  if (!storedUsers) {
    storedUsers = {};
    localStorage.setItem('users', JSON.stringify(storedUsers));
  }

  const storedUser = storedUsers[userInfo.username];

  if (storedUser && storedUser.password === userInfo.password) {
    const accessToken = jwt.sign({ userId: storedUser.userId }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    authUser = storedUser;
    authUserToken = accessToken;
    return true;
  }

  return false;
}

export function logout() {
  // Log out the user and clear session storage
  authUser = null;
  authUserToken = null;
  localStorage.removeItem('authUserToken');
  localStorage.removeItem('user');
}

export function isAuthenticated() {
  if (authUser && authUserToken) {
    return true;
  }
  return false;
}

export function getAuthenticatedUser() {
  return authUser;
}

export function setAuthenticatedUser(user) {
  authUser = user;
  authUserToken = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  localStorage.setItem('authUserToken', authUserToken);
  localStorage.setItem('user', JSON.stringify(user));
}