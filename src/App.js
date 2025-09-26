// @flow

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

function LoginForm({ onSubmit, errorMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      onSubmit();
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogin = async () => {
    setLoginStatus(true);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, ! <button onClick={handleLogout}>Logout</button>
          </h2>
        ) : (
          loginStatus === false && (
            <LoginForm onSubmit={handleLogin} errorMessage={null} />
          )
        )}
      </header>
    </div>
  );
}

export default App;

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should render input fields', () => {
    const { getByPlaceholderText } = render(<LoginForm onSubmit={() => {}} />);
    expect(getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('should display error message when username and password are invalid', () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={() => {}} />);
    const usernameInput = getByPlaceholderText('Enter username');
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.change(usernameInput, { target: { value: 'invalid' } });
    fireEvent.change(passwordInput, { target: { value: 'invalid' } });
    const button = getByText('Login');
    fireEvent.click(button);
    expect(getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('should call onSubmit function when form is submitted successfully', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText } = render(<LoginForm onSubmit={onSubmit} />);
    const usernameInput = getByPlaceholderText('Enter username');
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const button = getByText('Login');
    fireEvent.click(button);
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should display loading state when form is submitted', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={() => {}} />);
    const usernameInput = getByPlaceholderText('Enter username');
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const button = getByText('Login');
    fireEvent.click(button);
    await waitFor(() => expect(getByText('Logging in...')).toBeInTheDocument());
  });
});