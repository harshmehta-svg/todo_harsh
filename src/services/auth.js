// src/services/auth.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2-ffi');
const mongoose = require('mongoose');
const userSchema = mongoose.model('User');
const emailService = require('./emailService'); // Import email service
const totpService = require('./totpService'); // Import TOTP service
const GoogleAuth = require('node-google-auth'); // Import Google Authenticator

// Password hashing and verification
const hashPassword = async (password) => {
  try {
    const salt = await argon2.hash('12');
    const hashedPassword = await argon2.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
};

const verifyPassword = async (inputPassword, hashedPassword) => {
  try {
    const verified = await argon2.verify(hashedPassword, inputPassword);
    return verified;
  } catch (err) {
    throw err;
  }
};

// Email Verification
const generateVerificationToken = async (user) => {
  try {
    const token = Math.random().toString(36).substr(2, 10);
    user.verificationToken = token;
    await user.save();
    await emailService.sendVerificationEmail(user.email, token);
    return token;
  } catch (err) {
    throw err;
  }
};

const verifyVerificationToken = async (user, token) => {
  try {
    if (user.verificationToken !== token) {
      throw new Error('Verification token is invalid or expired');
    }
    await user.updateOne({ verified: true });
    return true;
  } catch (err) {
    throw err;
  }
};

// TOTP Verification
const verifyTOTP = async (username, totpCode) => {
  try {
    const totpSecret = await totpService.getTOTPSecret(username);
    if (!totpSecret) {
      throw new Error('Invalid TOTP');
    }
    const decodedTOTP = GoogleAuth.decodeTOTPSecret(totpSecret);
    if (decodedTOTP != totpCode) {
      throw new Error('Invalid TOTP code');
    }
    return true;
  } catch (err) {
    throw err;
  }
};

// Authentication and Authorization
const authenticate = async (username, password, totpCode) => {
  try {
    const user = await userSchema.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    if (!user.verified) {
      throw new Error('Email is not verified');
    }
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    const isValidTOTP = await verifyTOTP(username, totpCode);
    if (!isValidTOTP) {
      throw new Error('Invalid TOTP code');
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  } catch (err) {
    throw err;
  }
};

const authorize = (role) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        throw new Error('Access denied');
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (role !== 0 && decoded.role !== role) {
        throw new Error('Access denied');
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).send({ error: err.message });
    }
  };
};

// Token Refresh
const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
    const user = await userSchema.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const newToken = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    const newRefreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY);
    return { newToken, newRefreshToken };
  } catch (err) {
    throw err;
  }
};

const validateRoles = async (req, res, next) => {
  try {
    // Define roles and their permissions
    const roles = {
      admin: ['createUser', 'manageReports'],
      manager: ['viewReport'],
      employee: ['viewData'],
    };

    // Get the user's role
    const userRole = req.user.role;

    // Get the route's permissions
    const routePermissions = req.route.permissions;

    // Check if the user has the required permissions
    if (!Object.keys(roles[userRole]).includes(routePermissions)) {
      throw new Error('Access denied');
    }

    next();
  } catch (err) {
    res.status(403).send({ error: err.message });
  }
};

// User model schema
userSchema.methods.addRole = async function (role) {
  try {
    this.role = role;
    await this.save();
    return true;
  } catch (err) {
    throw err;
  }
};

userSchema.methods.removeRole = async function (role) {
  try {
    this.role = role === 'admin' ? 'user' : role;
    await this.save();
    return true;
  } catch (err) {
    throw err;
  }
};

// Update user role
userSchema.statics.updateRole = async function (username, role) {
  try {
    const user = await userSchema.findOne({ username });
    if (user) {
      await user.updateRole(role);
      return true;
    }
    throw new Error('User not found');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateVerificationToken,
  verifyVerificationToken,
  authenticate,
  authorize,
  refreshToken,
  validateRoles,
  verifyTOTP,
};

// Example route with role-based access control
router.route('/createUser').post(
  authorize('admin'),
  async (req, res) => {
    try {
      // Create a new user
      const user = new User(req.body);
      await user.save();
      res.send({ message: 'User created' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

router.route('/viewReport').get(
  authorize('manager'),
  async (req, res) => {
    try {
      // Get the report data
      const reportData = await Report.find();
      res.send(reportData);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);