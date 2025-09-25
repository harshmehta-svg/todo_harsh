// src/database/schema.js

// Import the necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Define the user schema with encryption for sensitive fields
const userSchema = new mongoose.Schema({
  // Password field is encrypted using bcrypt
  password: { type: String, set: pwd => bcrypt.hashSync(pwd, 10) },
  // Email field is case-insensitive
  email: { type: String, unique: true, lowercase: true },
  // Name field is a string
  name: String,
  // Social login data, if available
  socialLogin: {
    google: {
      id: String,
      token: String
    },
    github: {
      id: String,
      token: String
    }
  },
  // Timestamps for createdAt and updatedAt fields
  createdAt: { type: Date, default: Date.now, timestamps: true },
  updatedAt: { type: Date, default: Date.now, timestamps: true }
}, {
  // Versioning for optimistic concurrency control
  versionKey: false
});

// Export the user schema
module.exports = mongoose.model('User', userSchema);