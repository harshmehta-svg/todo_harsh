// src/App.e2e.test.js

const { test, page } = require('@playwright/test');

const url = process.env.APP_URL || 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

test.describe('Checkout Flow', () => {
    test('Checkout flow test', async ({ page }) => {
        // Step 1: Add product
        await page.click('[data-testid="add-product-btn"]');
        await page.click('[data-testid="product-item"]');
        await page.click('[data-testid="add-to-cart-btn"]');

        // Step 2: Get product quantity
        const productQuantityLocator = '[data-testid="cart-counter-value"]';
        const productQuantity = await page.innerText(productQuantityLocator);

        // Step 3: Go to cart
        await page.click('[data-testid="show-cart-btn"]');
        await page.click('[data-testid="go-to-cart-btn"]');

        // Step 4: Checkout
        await page.click('[data-testid="start-checkout-btn"]');
        await page.fill('[data-testid="checkout-first-name-input"]', 'John');
        await page.fill('[data-testid="checkout-last-name-input"]', 'Doe');
        await page.fill('[data-testid="checkout-email-input"]', 'john.doe@example.com');
        await page.fill('[data-testid="checkout-phone-input"]', '+1234567890');

        // Step 5: Confirm order
        await page.click('[data-testid="submit-order-btn"]');
        await page.click('[data-testid="confirm-order-btn"]');

        // Validate success message
        const successMessageLocator = '[data-testid="order-success-msg"]';
        const successMessage = await page.innerText(successMessageLocator);
        expect(successMessage).toBe('Order confirmed successfully!');
    });
});
