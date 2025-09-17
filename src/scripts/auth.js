// src/scripts/auth.js

// Import dependencies
import React, { useState } from 'react';
import { axios } from 'axios';
import { useNavigate } from 'react-router-dom';

// Existing code remains unchanged
function login(username, password) {
    // Implementation remains the same
    // Return the user object upon successful login
    axios.post('/api/auth/login', { username, password }).then((response) => {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
    }).catch((error) => {
        console.error(error);
    });
}

function register(username, password, confirmPassword) {
    // Implementation remains the same
    // Return the user object upon successful registration
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    axios.post('/api/auth/register', { username, password }).then((response) => {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
    }).catch((error) => {
        console.error(error);
    });
}

// Additional functionality for user registration
function signup(username, password, confirmPassword, email) {
    // Validate input fields
    if (!username || !password || !confirmPassword || !email) {
        alert("Please fill out all fields");
        return;
    }

    register(username, password, confirmPassword, email);
}

// Export the existing functions
export { login, register };

// Define a function to handle user signup
async function handleSignup(username, password, confirmPassword, email) {
    signup(username, password, confirmPassword, email);
}

// Export the handleSignup function as well
export default handleSignup;