// File: src/utils/ajax.js
import axios from 'axios';

axios.defaults.baseURL = '/api';

export function fetchUser(id) {
  return axios.get(`/users/${id}`);
}

export function fetchUsers() {
  return axios.get('/users');
}

export function createUser(data) {
  return axios.post('/users', data);
}

export function updateUser(id, data) {
  return axios.put(`/users/${id}`, data);
}

export function deleteUser(id) {
  return axios.delete(`/users/${id}`);
}