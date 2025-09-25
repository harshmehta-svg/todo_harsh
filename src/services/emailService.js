// emailService.js
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { sendMailConfig } from '../configs/mailConfig';
import { logger } from '../utils/logger';
import { User } from '../models/User';

let transporter;

const initializeTransporter = () => {
  return nodemailer.createTransport(sendMailConfig);
};

const sendEmail = async (options) => {
  try {
    if (!transporter) {
      transporter = await initializeTransporter();
    }

    const mailOptions = {
      from: sendMailConfig.auth.user,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(info.response);

    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

const sendPasswordResetEmail = async (token, email) => {
  const resetUrl = process.env.CLIENT_URL + '/reset-password?token=' + token;

  const mailOptions = {
    to: email,
    subject: 'Password Reset',
    html: `
      <p>You are receiving this email because you (or someone else) have requested a password reset for your Todo App account.</p>
      <p>Please click on the following link to reset your password:</p>
      <p><a href="${resetUrl}" target="_blank" rel="noopener noreferrer">${resetUrl}</a></p>
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
  };

  return sendEmail(mailOptions);
};

const verifyPasswordResetToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

const resetPassword = async (newPassword, token) => {
  try {
    const decoded = await verifyPasswordResetToken(token);
    if (!decoded) {
      return false;
    }

    const user = await User.findOne({ where: { resetToken: token } });
    if (!user) {
      return false;
    }

    user.password = newPassword;
    await user.save();

    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export {
  sendPasswordResetEmail,
  verifyPasswordResetToken,
  resetPassword,
};