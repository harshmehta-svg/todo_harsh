import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill all required fields');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/api/login', { email, password });
        console.log(response.data);
        setSuccess('Login successful');
      } catch (error) {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded p-8" onSubmit={handleSubmit}>
        <h2 className="text-3xl text-gray-700 text-center mb-4">Login</h2>
        <div className="mb-4">
          <label
            className="block text-2xl text-gray-600 font-bold mb-2"
            htmlfor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 text-2xl text-gray-700 focus:outline-none transition duration-500 ease-in-out transform border border-gray-300 rounded-md focus:border-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@example.com"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-2xl text-gray-600 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 text-2xl text-gray-700 focus:outline-none transition duration-500 ease-in-out transform border border-gray-300 rounded-md focus:border-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-500 mt-2">{success}</div>}
      </form>
    </div>
  );
};

export default Auth;