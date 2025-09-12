// src/services/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); // Assuming User model is in models folder

// API endpoint for user list
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
});

// API endpoint for user authentication
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to authenticate' });
    }
});

// API endpoint for adding a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, phoneNumber, description, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const user = await User.create({
            username,
            email,
            phoneNumber,
            description,
            password
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// Export the router
module.exports = router;