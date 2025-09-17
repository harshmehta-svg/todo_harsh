// src/components/TodoList.js

import React from 'react';
import './TodoList.css';

function TodoList() {
  return (
    <div className="todo-list-container">
      <Header />
      <div className="list-header">
        <h1>Todo List</h1>
        <button className="add-button">+</button>
      </div>
      <ul className="todo-list">
        {/* Render todo list items */}
        <li className="todo-item">
          <input type="checkbox" id="todo-item-1" />
          <label for="todo-item-1">Item 1</label>
          <button className="delete-button">x</button>
        </li>
        <li className="todo-item">
          <input type="checkbox" id="todo-item-2" />
          <label for="todo-item-2">Item 2</label>
          <button className="delete-button">x</button>
        </li>
        <li className="todo-item">
          <input type="checkbox" id="todo-item-3" />
          <label for="todo-item-3">Item 3</label>
          <button className="delete-button">x</button>
        </li>
      </ul>
    </div>
  );
}

// Custom Header component
function Header() {
  return (
    <header className="app-header">
      <h1>Welcome to Todo List App</h1>
    </header>
  );
}

export default TodoList;