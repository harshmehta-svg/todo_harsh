import React, { useState, useEffect } from 'react';
import { browser, playwright } from 'playwright';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [cartItems, setCartItems] = useState([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleModeSwitch = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleAddTodo = () => {
    setTodos([...todos, { id: Math.random().toString(36).substring(2, 15), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleUndoCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: false } : todo))
    );
  };

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const checkout = async () => {
    if (cartItems.length > 0) {
      try {
        const { page } = await browser.newContext();
        await page.goto('https://www.example.com/cart');
        const cart = await page.$$eval('tr', (items) =>
          items.map((item) => ({
            title: item.querySelector('span').textContent,
            price: +item.querySelector('td:nth-child(2)').textContent.replace('$', ''),
          }))
        );
        console.log(cart);
        for (const { title, price } of cart) {
          await page.evaluate((title, price) => {
            document.querySelector('button').click();
            setTimeout(() => {
              document.querySelector('#product-title').value = title;
              document.querySelector('#product-price').value = price;
              document.querySelector('button[type="submit"]').click();
            }, 1000);
          }, title, price);
        }
        await page.waitForSelector('#order-success');
        await page.screenshot({ path: 'checkout-success.png' });
        setCheckoutSuccess(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('No items in cart');
    }
  };

  useEffect(() => {
    const checkCart = async () => {
      const { page } = await browser.newContext();
      await page.goto('https://www.example.com/cart');
      await page.waitForSelector('#product-count');
      const count = await page.$eval('#product-count', (element) => element.textContent);
      console.log(count);
      setCartItems([]);
    };
    checkCart();
  }, []);

  const generateProduct = Math.floor(Math.random() * 100);
  const product = {
    id: generateProduct,
    title: `Product ${generateProduct}`,
    price: Math.floor(Math.random() * 100),
  };

  return (
    <div
      className={`todo-list ${darkMode ? 'dark-mode' : ''}`}
      style={{
        background: darkMode ? '#333' : '#f0f0f0',
        color: darkMode ? '#fff' : '#333',
      }}
    >
      <h2>Todo List</h2>
      <button className="mode-switch" onClick={handleModeSwitch}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <input
        type="text"
        placeholder="New Todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="add-todo" onClick={handleAddTodo}>
        Add Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleCompleteTodo(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button className="delete-todo" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
            <button
              className="undo-complete-todo"
              onClick={() => handleUndoCompleteTodo(todo.id)}
              style={{ display: todo.completed ? 'inline-block' : 'none' }}
            >
              Undo
            </button>
          </li>
        ))}
      </ul>
      <button onClick={checkout}>Checkout</button>
      {cartItems.length > 0 && (
        <div>
          <h2>Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <span>${item.price}</span>
                <button onClick={() => addItemToCart(product)}>Add Another Item</button>
                <button onClick={() => setCartItems([])}>Clear Cart</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {checkoutSuccess && (
        <div>
          <h2>Checkout Successful</h2>
          <img src="checkout-success.png" alt="Checkout Successful" />
        </div>
      )}
    </div>
  );
};

export default TodoList;