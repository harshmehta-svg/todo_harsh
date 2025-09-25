// src/components/EmailService.js

import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../config';
import User from '../models/User';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendEmail = async (email, subject, message) => {
  const mailOptions = {
    from: config.email.user,
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const newPasswordToken = jwt.sign(
      {
        id: user._id,
        resetPasswordToken: Math.random().toString(36).substr(2, 8),
      },
      config.jwt.secret,
      {
        expiresIn: '1h',
      },
    );

    await user.updateOne({
      resetPasswordToken: newPasswordToken,
    });

    await sendEmail(email, 'Password Reset', `http://localhost:3000/reset-password/${newPasswordToken}`);
  } catch (error) {
    console.error(error);
  }
};

import { sendForgotPasswordRequest } from './forgotPassword';

export const sendVerifyEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    await sendEmail(email, 'Verify Email', `http://localhost:3000/verify-email/${user._id}`);
  } catch (error) {
    console.error(error);
  }
};

export const sendConfirmationEmail = async (email, token) => {
  try {
    await sendEmail(email, 'Verify Email', `http://localhost:3000/confirm/${token}`);
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;