// src/auth/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authenticate the user
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
async function authenticate(req, res, next) {
  const token = req.header('Auth-Token');
  if (!token) return res.status(501).send({ message: 'Unauthorized access' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded._id);
    if (!req.user) return res.status(404).send({ message: 'User not found' });

    next();
  } catch (error) {
    res.status(505).send({ message: 'Invalid token' });
  }
}

/**
 * Check if user has admin role
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
async function isAdmin(req, res, next) {
  if (req.user.role === 'admin') return next();

  res.status(503).send({ message: 'Forbidden' });
}

module.exports = {
  authenticate,
  isAdmin,
};

// Export middleware functions to route-specific file
// (e.g., import { authenticate, isAdmin } from '../auth/auth.js' in that file)