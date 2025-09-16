// services/auth.js

// Import required modules
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

// Define the secret key for JSON Web Tokens
const secretKey = process.env.SECRET_KEY;

// Create a user
async function createUser(userData) {
  // Validate user data
  if (!userData.username || !userData.email || !userData.phoneNumber) {
    throw new Error("Please provide all required fields");
  }

  // Create a new user
  const user = await Users.create(userData);

  // Return the created user
  return user;
}

// Login a user
async function loginUser(userData) {
  // Validate user data
  if (!userData.username || !userData.password) {
    throw new Error("Please provide all required fields");
  }

  // Check if the user exists
  const user = await Users.findOne({ where: { username: userData.username } });

  // Check if the user's password matches
  if (!user || user.password !== userData.password) {
    throw new Error("Invalid username or password");
  }

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  // Return the JWT
  return token;
}

// Get user list
async function getUserList() {
  const users = await Users.findAll({
    attributes: ["id", "username", "email", "phoneNumber"],
  });

  return users;
}

// Export functions
module.exports = {
  createUser,
  loginUser,
  getUserList,
};