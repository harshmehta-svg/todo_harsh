// src/hooks/useRegister.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import prisma from '../prismaClient';
import { jwt } from 'jsonwebtoken';

// API route endpoint
const apiRoute = '/api/register';

// Secret key for JSON Web Token
const secretKey = process.env.JWT_SECRET;

export const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter();

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Input validation
    const validate = () => {
      const errors = {};

      if (!name) errors.name = 'Name is required.';
      if (!email) errors.email = 'Email is required.';
      if (!password) errors.password = 'Password is required.';
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        errors.email = 'Invalid email address.';
      if (password.length < 6) errors.password = 'Password must be at least 6 characters.';

      return errors;
    };

    const errors = validate();

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    try {
      // Hash password
      const hashedPassword = await prisma.$transact({
        update: {
          where: {
            email: email,
          },
          data: {
            password: await bcrypt.hash(password, 10),
          },
        },
      });

      // Generate JSON Web Token
      const token = jwt.sign(
        {
          name,
          email,
          exp: Math.floor(Date.now() / 1000) + 30,
        },
        secretKey
      );

      // Set JWT cookie
      router.push('/login');

      // Return JWT token
      return token;
    } catch (err) {
      console.error(err);
      setErrors({ server: 'Server Error' });
      return null;
    }
  };

  return { name, setName, email, setEmail, password, setPassword, errors, handleSubmit };
};