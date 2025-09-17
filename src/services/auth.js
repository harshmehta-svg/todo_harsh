// src/services/auth.js

const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

class AuthServices {
  async signup(req, res) {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        return res.status(400).json({ message: 'Please provide all fields.' });
      }

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({ username, email, password: hashedPassword });

      const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: '1h' });
      res.json({ token, user: { id: newUser.id, username, email } });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async signin(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Please provide all fields.' });
      }

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password.' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid username or password.' });
      }

      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, username, email: user.email } });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      await this.signin(req, res);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async verifyToken(req, res) {
    try {
      const token = req.header('Authorization');
      if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

      const decoded = jwt.verify(token, jwtSecret);

      // Check if user exists
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(403).json({ message: 'Access denied. Invalid user ID.' });
      }

      res.json({ message: 'Valid token', user: { id: decoded.id, username: user.username } });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = AuthServices;