// src/scripts/services/auth.js

import axios from 'axios';

const API_PATH = 'https://api.example.com';

export const signup = async (data) => {
    try {
        const response = await axios.post(`${API_PATH}/signup`, data);
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_PATH}/login`, data);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_PATH}/logout`);
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};