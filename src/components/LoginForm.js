// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (username === '' || password === '') {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    axios.post('/api/login', { username, password })
      .then((res) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setError('Invalid username or password');
        setLoading(false);
      });
  };

  return (
    <div className="LoginForm">
      {success ? (
        <p>Login successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;

// src/components/LoginForm.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../store/reducers';
import LoginForm from './LoginForm';
import axios from 'axios';

jest.mock('axios');

describe('LoginForm component', () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    expect(getByText('Username:')).toBeInTheDocument();
    expect(getByText('Password:')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should handle input validation (empty username)', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const usernameInput = getByPlaceholderText('Username:');
    fireEvent.change(usernameInput, { target: { value: '' } });
    const passwordInput = getByPlaceholderText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const form = passwordInput.closest('form');
    fireEvent.submit(form);
    expect(getByText('Please fill in all fields')).toBeInTheDocument();
  });

  it('should handle input validation (empty password)', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const usernameInput = getByPlaceholderText('Username:');
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    const passwordInput = getByPlaceholderText('Password:');
    fireEvent.change(passwordInput, { target: { value: '' } });
    const form = passwordInput.closest('form');
    fireEvent.submit(form);
    expect(getByText('Please fill in all fields')).toBeInTheDocument();
  });

  it('should handle input validation (invalid username)', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const usernameInput = getByPlaceholderText('Username:');
    fireEvent.change(usernameInput, { target: { value: 'invalid!' } });
    const passwordInput = getByPlaceholderText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const form = passwordInput.closest('form');
    fireEvent.submit(form);
    expect(getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('should handle input validation (invalid password)', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const usernameInput = getByPlaceholderText('Username:');
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    const passwordInput = getByPlaceholderText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'invalid!' } });
    const form = passwordInput.closest('form');
    fireEvent.submit(form);
    expect(getByText('Invalid username or password')).toBeInTheDocument();
  });

  it('should call API on form submission', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const usernameInput = getByPlaceholderText('Username:');
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    const passwordInput = getByPlaceholderText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const form = passwordInput.closest('form');
    fireEvent.submit(form);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('/api/login', {
      username: 'test',
      password: 'password',
    });
  });

  it('should update state on form submission', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const usernameInput = getByPlaceholderText('Username:');
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    const passwordInput = getByPlaceholderText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const form = passwordInput.closest('form');
    fireEvent.submit(form);
    await waitFor(() => expect(queryByText('Login')).not.toBeInTheDocument());
    expect(queryByText('Login successful!')).toBeInTheDocument();
  });
});