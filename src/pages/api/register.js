// New file

// Importing necessary packages and classes
const { NextApiRequest, NextApiResponse } = require('next');

// Prisma Client instance
import { PrismaClient } from '@prisma/client';

// JWT Secret key
const jwtSecret = 'your_secret_key_here';

// Prisma Client instance
const prisma = new PrismaClient();

// Function to generate a JWT
const generateJWT = (user) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
};

// API route for user registration
export default async function register(req: NextApiRequest, res: NextApiResponse) {
    // Checking the HTTP method
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    } else {
        // Destructuring request body
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Validation using regular expressions
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            res.status(400).json({ message: 'Invalid email' });
            return;
        }

        // Password validation (min 8 characters, one uppercase, one lowercase, one digit)
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            res.status(400).json({ message: 'Invalid password. Minimum 8 characters, one uppercase, one lowercase and one digit' });
            return;
        }

        // Hashing password using bcrypt
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            // Returning JWT
            const jwtToken = generateJWT(user);
            res.json({ message: 'User created successfully', jwtToken });
        } catch (error) {
            // Return error response
            res.status(400).json({ message: 'Error creating user' });
        }
    }
}