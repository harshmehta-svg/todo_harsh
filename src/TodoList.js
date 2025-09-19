// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Add necessary imports for dark mode implementation
import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Define the theme options for dark mode
const themeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#333',
      paper: '#444',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
  },
};

// Create a new theme with dark mode
const theme = createTheme(themeOptions);

// Function component for Todo List
function TodoList() {
  // Initialize state for Todo List
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(false);

  // Function to handle add Todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), task: input, completed: false }]);
    setInput('');
  };

  // Function to handle delete Todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to handle toggle Todo
  const handleToggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  // Function to switch dark mode
  const handleSwitchDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Render Todo List
  return (
    <ThemeProvider theme={darkMode ? themeOptions : { palette: { mode: 'light' } }}>
      <div>
        <h1>Todo List</h1>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
          />
          <button type="submit">Add Todo</button>
          <button onClick={handleSwitchDarkMode}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleToggleTodo(todo.id)}>Toggle</button>
            </li>
          ))}
        </ul>
        <footer>
          <p>Created by [Your Name]</p>
        </footer>
      </div>
      <style>
        {`
          /* Add styling for dark mode */
          body {
            background-color: ${darkMode ? '#333' : '#f2f2f2'};
            color: ${darkMode ? '#fff' : '#333'};
            font-family: Arial, sans-serif;
            font-size: 16px;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          li {
            padding: 10px;
            border-bottom: 1px solid ${darkMode ? '#444' : '#ccc'};
          }
          li:last-child {
            border-bottom: none;
          }
          button {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #3e8e41;
          }
        `}
      </style>
    </ThemeProvider>
  );
}

export default TodoList;