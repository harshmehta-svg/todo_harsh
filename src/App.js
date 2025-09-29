// @flow

import React, { useState } from 'react';
import './App.css';
import { testCheckout } from './Checkout.test';
import { chromium } from '@playwright/test';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogin = (event:SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  const handleRedirectToCheckout = () => {
    window.location.href = '/cart';
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}! <button onClick={handleLogout}>Logout</button>
            <button onClick={handleRedirectToCheckout}>Redirect to Checkout</button>
          </h2>
        ) : (
          loginStatus === false && (
            <form onSubmit={handleLogin}>
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
              <button type="submit">Login</button>
            </form>
          )
        )}
      </header>
    </div>
  );
}

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [isProceedingCheckout, setIsProceedingCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleProceedCheckout = (event) => {
    event.preventDefault();
    setIsProceedingCheckout(true);
  };

  const handleConfirmOrder = async (event) => {
    event.preventDefault();
    setIsProceedingCheckout(false);
    setCheckoutStatus('Order confirmed!');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080,
      },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/cart/checkout/confirm-order');
    await page.waitForSelector('.CheckoutForm p');
    await page.screenshot({ path: './checkout-flow-confirmed.png' });
    const orderId = await page.$eval('.CheckoutForm p', (elem) => parseInt(elem.textContent.replace(/[^0-9]+/g, '')));
    setOrderId(orderId);
    await browser.close();
  };

  return (
    <div className="Checkout">
      {isProceedingCheckout === false && (
        <div className="Cart">
          <h2>Cart</h2>
          <ul>
            {cartItems.map((item, key) => (
              <li key={key}>{item}</li>
            ))}
          </ul>
          <button onClick={() => window.location.href = '/cart/checkout'}>Proceed to checkout</button>
        </div>
      )}
      {isProceedingCheckout === true && (
        <div className="CheckoutForm">
          <h2>Checkout</h2>
          <form onSubmit={handleConfirmOrder}>
            <button type="submit">Confirm Order</button>
            <p>{checkoutStatus}</p>
            <p>Order ID: {orderId}</p>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

import { test } from '@playwright/test';
import { chromium } from '@playwright/test';
import { Checkout } from './Checkout';

test.beforeEach(async ({ page }) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
  page = await context.newPage();
  await page.goto('http://localhost:3000');
});

test('e2e: add product → go to cart → go to checkout', async ({ page }) => {
  await page.fill('[name=username]', 'admin');
  await page.fill('[name=password]', 'password');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.App-header h2');
  await page.click('.App-header h2 > button');
  await page.goto('http://localhost:3000/cart');
  await page.click('button:has-text("Add to Cart")');
  await page.goto('http://localhost:3000/cart/checkout');
  await page.click('button:has-text("Confirm Order")');
  await page.waitForSelector('.CheckoutForm p');
  await page.screenshot({ path: './checkout-flow.png' });
});

test('e2e: checkout with confirm order', async ({ page }) => {
  await page.fill('[name=username]', 'admin');
  await page.fill('[name=password]', 'password');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.App-header h2');
  await page.click('.App-header h2 > button');
  await page.goto('http://localhost:3000/cart/checkout');
  await page.click('button:has-text("Confirm Order")');
  await page.waitForSelector('.CheckoutForm p');
  await page.screenshot({ path: './checkout-flow-confirmed.png' });
});

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/cart/:productId" element={<Checkout />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/cart/checkout/confirm-order" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);