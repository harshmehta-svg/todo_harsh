import express from 'express';

// Import required dependencies
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verify } from 'crypto';
import { jsonwebtoken } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';

// Prisma client instance
const prisma = new PrismaClient();

// API route handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get user input from the request body
  const { name, email, password } = req.body;

  try {
    // Validate user input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if email already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({ data: { name, email, password: hashedPassword } });

    // Generate a JWT token
    const jwtToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return the JWT token
    return res.status(201).json({ jwtToken });
  } catch (error) {
    // Return an error response if something goes wrong
    return res.status(500).json({ error: 'Failed to create user.' });
  }
};

// Register API route
export default express.Router().post('/api/register', handler);