// tests/Form.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../components/LoginForm';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '../stores/store';
import { render as renderRedux } from '@testing-library/react-redux';

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.json({ user: 'username' }));
  }),
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test('renders login form', async () => {
  const { getByText } = renderRedux(
    <Provider store={store}>
      <LoginForm />
    </Provider>,
  );
  expect(getByText('Login')).toBeInTheDocument();
});

test('should validate email input on input change', async () => {
  const { getByPlaceholderText } = renderRedux(
    <Provider store={store}>
      <LoginForm />
    </Provider>,
  );
  const emailInput = getByPlaceholderText('email');
  fireEvent.change(emailInput, {
    target: { value: 'invalid-email' },
  });
  expect(emailInput).toHaveStyle('border-color: red');
});

test('should validate password input on input change', async () => {
  const { getByPlaceholderText } = renderRedux(
    <Provider store={store}>
      <LoginForm />
    </Provider>,
  );
  const passwordInput = getByPlaceholderText('password');
  fireEvent.change(passwordInput, {
    target: { value: 'invalid-password' },
  });
  expect(passwordInput).toHaveStyle('border-color: red');
});

test('should submit the form when credentials are correct', async () => {
  const { getByPlaceholderText, getByText } = renderRedux(
    <Provider store={store}>
      <LoginForm />
    </Provider>,
  );
  const emailInput = getByPlaceholderText('email');
  const passwordInput = getByPlaceholderText('password');
  fireEvent.change(emailInput, {
    target: { value: 'valid-email' },
  });
  fireEvent.change(passwordInput, {
    target: { value: 'valid-password' },
  });
  fireEvent.click(getByText('Login'));
  await waitFor(() =>
    expect(emailInput).toHaveStyle('border-color: initial'),
  );
  await waitFor(() =>
    expect(passwordInput).toHaveStyle('border-color: initial'),
  );
});

test('should call api on form submission', async () => {
  const { getByPlaceholderText, getByText } = renderRedux(
    <Provider store={store}>
      <LoginForm />
    </Provider>,
  );
  const emailInput = getByPlaceholderText('email');
  const passwordInput = getByPlaceholderText('password');
  fireEvent.change(emailInput, {
    target: { value: 'valid-email' },
  });
  fireEvent.change(passwordInput, {
    target: { value: 'valid-password' },
  });
  const loginButton = getByText('Login');
  jest.spyOn(window.fetch, 'default');
  fireEvent.click(loginButton);
  await waitFor(() => expect(loginButton).toBeDisabled());
  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect(window.fetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
});