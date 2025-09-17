// Import existing dependencies
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Local variables for testing (remove in production)
const SECRET_KEY = 'your_secret_key';
const HOST_URL = 'http://localhost:8080'; // Change to your actual host URL

// Existing functions
function login(username, password) {
    return axios.post(`${HOST_URL}/login`, { username, password })
        .then(response => response.data)
        .catch(error => {
            console.error('Login request failed:', error);
            return { error };
        });
}

function register(username, password) {
    return axios.post(`${HOST_URL}/register`, { username, password })
        .then(response => response.data)
        .catch(error => {
            console.error('Registration request failed:', error);
            return { error };
        });
}

// New signup function
function signup(username, password, confirmPassword) {
    if (password !== confirmPassword) {
        return { error: 'Passwords do not match' };
    }

    return register(username, password)
        .then(() => { return login(username, password); })
        .catch(error => {
            console.error('Signup request failed:', error);
            return { error };
        });
}

// Export existing and new functions
module.exports = {
    login,
    register,
    signup
};