// src/pages/api/register.js

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secretKey = process.env.SECRET_KEY;

async function register(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
      },
      secretKey,
      {
        expiresIn: '1h',
      }
    );

    return res.status(201).json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering user.' });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return register(req, res);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

export { register };