// New file
// src/services/serviceA.js
// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const { check, body } = require('express-validator');
const config = require('./config'); // Assuming config file is in the same directory

const authValidatorMiddleware = [
  body('token').notEmpty().withMessage('Token is required')
];

// Verify JWT token middleware
const verifyJWTToken = async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

// Service A API endpoints
const serviceA = express.Router();

// GET endpoint to authenticate service-to-service
serviceA.post('/authenticate', authValidatorMiddleware, verifyJWTToken, (req, res) => {
  // Return authenticated user data as JSON
  res.json({ message: 'User authenticated successfully', user: req.user });
});

serviceA.get('/api/data', verifyJWTToken, (req, res) => {
  // Assuming some data is available
  res.json({ data: 'This is some data accessed by authenticated user' });
});

// Export the Express API
module.exports = serviceA;