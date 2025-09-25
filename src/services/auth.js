// Import required libraries
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const users = require('../models/users');

// Function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Function to validate strong password
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Function to generate JWT
const generateJWT = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
};

// Login function
const login = async (req, res) => {
  try {
    // Extract email/username and password from request body
    const { email, username, password } = req.body;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Find user by email or username
    let user;
    try {
      if (email) {
        user = await users.findOne({ email });
      } else if (username) {
        user = await users.findOne({ username });
      } else {
        return res.status(400).json({ message: 'Please provide either email or username' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error occurred while finding user' });
    }

    // If user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or username' });
    }

    // Compare password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT
    const token = generateJWT(user);

    // Return JWT
    return res.status(200).json({ token });
  } catch (error) {
    // Return error message
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Protected route middleware
const protectedRouteMiddleware = async (req, res, next) => {
  try {
    // Extract JWT token from request headers
    const token = req.headers.authorization;

    // If JWT token doesn't exist, return error
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify JWT token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid JWT token' });
    }

    // Get user from database
    let user;
    try {
      user = await users.findById(decoded.userId);
    } catch (error) {
      return res.status(500).json({ message: 'Error occurred while finding user' });
    }

    // If user doesn't exist, return error
    if (!user) {
      return res.status(400).json({ message: 'Invalid JWT token' });
    }

    // Call next middleware function
    next();
  } catch (error) {
    // Return error message
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Register route
router.post('/register', async (req, res) => {
  await register(req, res);
});

// Login route
router.post('/login', async (req, res) => {
  await login(req, res);
});

router.get('/profile', protectedRouteMiddleware, async (req, res) => {
  // Return user profile
  try {
    const user = await users.findById(req.user.userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred while finding user' });
  }
});

router.get('/dashboard', protectedRouteMiddleware, async (req, res) => {
  // Return dashboard data
  try {
    const user = await users.findById(req.user.userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred while finding user' });
  }
});

module.exports = router;