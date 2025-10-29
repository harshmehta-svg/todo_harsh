// A simple logger utility that only logs messages in development mode.
// In a real-world scenario, this would likely be in its own file (e.g., src/utils/logger.js).
const isDevelopment = process.env.NODE_ENV !== 'production';

const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    }
  },
};

/**
 * Authenticates a user.
 * @param {string} username The username.
 * @param {string} password The password.
 * @returns {{success: boolean, message?: string}} The result of the authentication.
 */
const login = (username, password) => {
  logger.log('Attempting to log in user:', username);

  if (username === 'admin' && password === 'password') {
    logger.log('Login successful for user:', username);
    return { success: true };
  } else {
    logger.error('Login failed: Invalid credentials provided for user:', username);
    return { success: false, message: 'Invalid username or password.' };
  }
};

/**
 * Logs a user out.
 * @param {string} username The username to log out.
 */
const logout = (username) => {
  logger.log(`Logging out user: ${username}`);
  // In a real application, you would invalidate a session or token here.
};

export { login, logout };