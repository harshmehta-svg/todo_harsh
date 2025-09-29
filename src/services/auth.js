// src/services/auth.js

// Importing necessary dependencies
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

// Key for encryption and verification
const secretKey = process.env.JWT_SECRET;

// Login Function
export async function login(credentials) {
  try {
    // Find user in the database
    const user = await User.findOne({ email: credentials.email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare password using Bcrypt
    const passwordComparison = await bcrypt.compare(credentials.password, user.password);

    if (!passwordComparison) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, secretKey);
    return token;
  } catch (error) {
    return { error: error.message };
  }
}

// Login API
export async function loginAPI(req, res) {
  try {
    const token = await login(req.body);
    if (typeof token === 'object' || token === null || token === undefined) {
      res.status(403).json(token);
    } else {
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error occurred during login' });
  }
}

// Register Function
export async function register(credentials) {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    // Create user in the database
    const newUser = await User.create({ email: credentials.email, password: hashedPassword });
    return newUser;
  } catch (error) {
    return { error: error.message };
  }
}

// Register API
export async function registerAPI(req, res) {
  try {
    const user = await register(req.body);
    if (typeof user === 'object' || user === null || user === undefined) {
      res.status(403).json(user);
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
}