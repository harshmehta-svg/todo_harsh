// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import custom models
const User = require('../models/User');

// Import middlewares
const authenticate = require('../middlewares/authenticate');

const app = express();

// Define routes for user authentication
app.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Validate user input
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).send({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).send({ message: 'Passwords do not match.' });
    }

    // Hash user password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    user.save((err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error creating user.' });
        }

        return res.send({ message: 'User created successfully.' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error finding user.' });
        }

        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password.' });
        }

        // Compare user password
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            return res.status(400).send({ message: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        return res.send({ token });
    });
});

// Protected route
app.get('/protected', authenticate, (req, res) => {
    return res.send({ message: 'Hello, authenticated user!' });
});

module.exports = app;