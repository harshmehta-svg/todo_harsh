// Import necessary dependencies
import React, { useState } from 'react';
import styles from '../styles/Login.module.css';

// Login function
function Login() {
  // State variable to store login credentials
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call API or perform logic to verify login credentials
    console.log(`Username: ${username}, Password: ${password}`);

    // Reset form fields
    setUsername('');
    setPassword('');
  };

  // Return JSX for login form
  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className={styles.button} type="submit">
          Login
        </button>
        <p>
          Don't have an account? <a href="#">Register</a>
        </p>
      </form>
    </div>
  );
}

// Export the Login component
export default Login;