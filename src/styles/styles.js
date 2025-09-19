// src/styles/styles.js

import './global.css';
import './app.css';
import './components/todo.css';
import './components/header.css';
import './components/footer.css';
import './components/todo-list.css';
import './components/todo-item.css';

// Merge multiple conflicting stylesheets into a single stylesheet
const styles = `
  /* Styles from global.css */
  :root {
    --primary-color: #3498db;
  }
  body {
    font-family: Arial, sans-serif;
  }

  /* Styles from app.css */
  .app-container {
    max-width: 800px;
    margin: 40px auto;
  }

  /* Styles from components/todo.css */
  .todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .todo-item {
    padding: 16px;
    border-bottom: 1px solid #ccc;
  }
  .todo-item:last-child {
    border-bottom: none;
  }

  /* Styles from components/header.css */
  .header {
    background-color: #333;
    color: #fff;
    padding: 16px;
    text-align: center;
  }

  /* Styles from components/footer.css */
  .footer {
    background-color: #333;
    color: #fff;
    padding: 16px;
    text-align: center;
    clear: both;
  }

  /* Styles from components/todo-list.css */
  .todo-list-item {
    font-size: 16px;
    margin-bottom: 16px;
  }

  /* Styles from components/todo-item.css */
  .todo-item-checkbox {
    margin-right: 16px;
  }

  /* Additional styles */
  .dark-mode {
    background-color: #444;
  }

  /* Dark mode styles from components/todo.css */
  .todo-list.dark-mode {
    background-color: #333;
  }

  /* Dark mode styles from components/header.css */
  .header.dark-mode {
    background-color: #222;
  }
`;


export { styles };