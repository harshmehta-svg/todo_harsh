// New file

// React Login Page Component
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

// Function component for the login page
function Login() {
  // State variable for username
  const [username, setUsername] = useState('');
  // State variable for password
  const [password, setPassword] = useState('');
  // State variable for error message
  const [error, setError] = useState(null);
  // State variable for success message
  const [success, setSuccess] = useState(null);
  const history = useHistory();

  // Handle submit event
  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulating authentication (in a real application, this would be an API call)
    if (username === 'admin' && password === 'password') {
      setSuccess('Login successful');
      setTimeout(() => {
        history.push('/');
      }, 2000);
    } else {
      setError('Invalid username or password');
    }
  };

  // Render the login form
  return (
    <Container className="mt-5">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </Form>
    </Container>
  );
}

// Exporting the Login component
export default Login;