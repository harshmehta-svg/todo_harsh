// New file

// Imports
import React from 'react';
import Login from './Login';

// Function to handle error messages
function handleErrorMessages(error, inputName) {
  if (error.message === 'email required') {
    return 'Email is required';
  } else if (error.message === 'password too short') {
    return 'Password should be at least 6 characters long';
  } else {
    return '';
  }
}

// Login form component
function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({
    emailError: '',
    passwordError: '',
  });

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: 'Email is required' }));
    } else if (email) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: '' }));
    }
    if (password.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: 'Password should be at least 6 characters long' }));
    } else if (password.length >= 6) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: '' }));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {errors.emailError && <p style={{ color: 'red' }}></p>}
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength="6"
        />
        {errors.passwordError && <p style={{ color: 'red' }}></p>}
        <br /> <br />
        <button type="submit">Submit</button>
      </form>
      {errors.emailError && <p style={{ color: 'red' }}>{errors.emailError}</p>}{' '}
      {errors.passwordError && <p style={{ color: 'red' }}>{errors.passwordError}</p>}
    </div>
  );
}

// Rendering the login form
function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

// Rendering the login form component
React ReactDOM.render(<App />, document.getElementById('root'));

// Exports
export { Login };