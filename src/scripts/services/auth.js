// services/auth.js

import jwt from 'jsonwebtoken';
import env from '../config/env';

const SECRET = env.SECRET;

// Existing user data model
const userData = {
  username: '',
  password: '',
  role: '', // New attribute to store user role (e.g., admin, user)
};

// Modified login function to handle user role
async function login(username, password) {
  const user = users.find((user) => user.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return { token, userData: { ...user, role: user.role } };
  }
  return null;
}

// Update the users array with user roles
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('password', 8),
    role: 'admin',
  },
  // Add more users with their respective roles
];

// Modified import/export statement
import bcrypt from 'bcrypt';

// Update the export statement to export the modified login function
export { login };

// Rest of the file remains unchanged