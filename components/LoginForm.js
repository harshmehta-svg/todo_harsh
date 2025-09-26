// node_modules/@types/react/index.d.ts
// node_modules/react/index.js
// node_modules/react-dom/index.js
// node_modules/@testing-library/jest-dom/index.js
// node_modules/@testing-library/react/index.js
// node_modules/react-test-renderer/index.js
// components/LoginForm.js
// components/LoginForm.test.js

// components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await axios.post('/api/login', { email, password });
      // Redirect to dashboard on successful login
      // For now, just log the result to console
      console.log('Logged in successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Login</button>
      {loading && <div>Loading...</div>}
    </form>
  );
};

export default LoginForm;