// src/scripts/services/auth.js

import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000/api';
const TOKEN_LOCAL_STORAGE = 'token';

async function authenticate(url, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        localStorage.setItem(TOKEN_LOCAL_STORAGE, data.token);
        return data.token;
    } catch (error) {
        toast.error('Authentication failed');
    }
}

async function getTask_2(token) {
    try {
        const response = await fetch(`${API_URL}/task_2`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.task_2;
    } catch (error) {
        toast.error('Failed to retrieve task_2');
    }
}

async function addTask_2(token, task_2Details) {
    if (!token) {
        return authenticate(`${API_URL}/authenticate`, task_2Details).then((token) => {
            return addTask_2(token, task_2Details);
        });
    }
    try {
        const response = await fetch(`${API_URL}/task_2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(task_2Details)
        });
        const data = await response.json();
        return data.task_2;
    } catch (error) {
        toast.error('Failed to add task_2');
    }
}

function clearToken() {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE);
}

function getToken() {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE);
    return token;
}

export { authenticate, addTask_2, getTask_2, clearToken, getToken };