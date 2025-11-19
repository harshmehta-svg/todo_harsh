```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className={`block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring focus:ring-blue-500`}
              type="email"
              id="email"
              {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
              placeholder="example@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">Please enter a valid email address.</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className={`block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring focus:ring-blue-500`}
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', { required: true, minLength: 8 })}
              placeholder="password"
            />
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">Please enter a password with at least 8 characters.</p>
            )}
          </div>
          <button
            className={`w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="text-gray-700 text-sm text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
```