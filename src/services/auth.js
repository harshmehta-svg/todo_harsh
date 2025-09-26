// src/services/auth.js
import axios from 'axios';

export const login = async (credentials) => {
    try {
        const response = await axios.post('/api/login', credentials);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw error.response.data;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            throw new Error('Failed to connect to the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw error;
        }
    }
};

// Integrate API call handling with the LoginForm component
export const handleSubmit = async (event, values) => {
    event.preventDefault();
    const credentials = {
        username: values.username,
        password: values.password,
    };

    try {
        const response = await login(credentials);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

export default {};