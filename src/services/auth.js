// src/services/auth.js

import { Request, Response } from 'express';
import User from '../models/User';

// Service to handle user authentication
class AuthService {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;

    // Validate username and password length
    if (username.length < 3 || password.length < 8) {
      return res.status(400).json({ message: 'Username and password must be valid' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create new user
    const user = new User({ username, password });
    await user.save();

    return res.json({ message: 'User created successfully' });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({ message: 'User logged in successfully' });
  }
}

export default AuthService;