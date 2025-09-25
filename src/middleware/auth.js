// src/middleware/auth.js

const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWT_SECRET || 'default-secret';
const bcrypt = require('bcrypt');
const { NextFunction, Request, Response } = require('express');

// User registration validation functions
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    if (password.length < 8) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[^a-zA-Z0-9]/.test(password)) return false;
    return true;
};

// User registration and login functionality
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters, contain uppercase, lowercase, number, and special character' });
        }
        // Store password securely using hashing (e.g., bcrypt)
        const hashedPassword = await bcrypt.hash(password, 10);
        // Store user credentials in a database or storage
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await // Retrieve user from database or storage
        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Generate and return a JWT (JSON Web Token) with an expiration time
        const payload = { email, userId: user.id };
        const token = jwt.sign(payload, jwtsecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Protected routes middleware
const protectedRoutes = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, jwtsecret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    protectedRoutes,
};