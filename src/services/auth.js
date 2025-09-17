// src/services/auth.js

// Import necessary dependencies
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { validateUsernamePassword } from '../utils/validation';
import config from '../config';

// Define login function
const login = async (username, password) => {
  // Validate username and password
  const isValid = await validateUsernamePassword(username, password);
  if (!isValid) {
    return {
      status: false,
      errorMessage: 'Invalid username or password',
      data: null,
    };
  }

  // Generate JWT token
  const token = jwt.sign({ id: uuidv4(), username }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION_TIME,
  });

  // Return JWT token
  return {
    status: true,
    errorMessage: null,
    data: {
      token,
    },
  };
};

// Export login function
export { login };

// Original auth.js content
// ... (unchanged code)

// Import logout function from auth.js (if available)
// import logout from '../auth';

// Export all functions (if available)
// export { login, logout };