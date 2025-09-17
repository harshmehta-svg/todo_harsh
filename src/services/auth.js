// src/services/auth.js

import axios from 'axios';
import { API_ROOT } from '../config';
import { loginSuccess, loginError } from '../actions/auth';

axios.interceptors.push({
  responseError: (error) => {
    if (error.response.status === 401) {
      loginError(error.response);
    }
    throw error;
  }
});

export const LOGIN_USER = (username, password) => dispatch => {
  axios.post(`${API_ROOT}/login`, {
    username,
    password
  })
  .then(response => {
    dispatch(loginSuccess(response.data));
  })
  .catch(error => {
    dispatch(loginError(error.response));
  });
};

export const AUTH_CHECK = () => dispatch => {
  axios.get(`${API_ROOT}/auth-check`)
  .then(response => {
    if (response.data.auth) {
      dispatch(loginSuccess(response.data));
    } else {
      dispatch(loginError(response.data));
    }
  })
  .catch(error => {
    dispatch(loginError(error.response));
  });
};