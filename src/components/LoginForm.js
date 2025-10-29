import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const initialErrors = {
    email: '',
    password: '',
  };

  const [errors, setErrors] = useState(initialErrors);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const { email, password } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailError = '';
    let passwordError = '';

    if (!email) {
      emailError = 'Email is required';
    } else if (!emailRegex.test(email)) {
      emailError = 'Invalid email';
    }

    if (password.trim().length < 8) {
      passwordError = 'Password should be at least 8 characters long';
    }

    if (!emailError && !passwordError) {
      return true;
    }

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return false;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // TO DO: Implement API call to perform login
      axios
        .post('/api/login', formData)
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'form-control error' : 'form-control'}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'form-control error' : 'form-control'}
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <div>
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </form>
  );
}

export default LoginForm;