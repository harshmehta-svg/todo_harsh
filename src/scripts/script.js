// New file
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// Import local storage data
const storedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

// Function to authenticate user login
function authenticateUser(username, password) {
  if (username === 'admin' && password === 'password') {
    localStorage.setItem('logged_in', true);
    return true;
  }
  localStorage.setItem('logged_in', false);
  return false;
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    setLoggingIn(true);
    if (!username || !password) {
      setErrorMessages([...errorMessages, 'Please fill in all fields']);
      return;
    }
    try {
      const response = await axios.post('/login', { username, password });
      localStorage.setItem('logged_in', true);
      window.location.href = '/todo';
    } catch (error) {
      setErrorMessages([...errorMessages, 'Invalid username or password']);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">{loggingIn ? 'Logging in...' : 'Login'}</button>
        {errorMessages && (
          <div className="error-message">
            {errorMessages.map((message, index) => (
              <span key={index}>{message}</span>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

function App() {
  // Get existing todos from local storage
  const [todos, setTodos] = useState(storedTodos);

  // State for displaying todo list
  const [showCompleted, setShowCompleted] = useState(false);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, { text: newTodo, completed: false }]);
    // Save data in local storage
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleToggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleUndoCompleted = () => {
    const newTodos = [...todos];
    newTodos.reverse();
    newTodos.forEach((todo, index) => {
      if (index < Math.floor(newTodos.length / 2)) {
        newTodos[index].completed = false;
      } else {
        newTodos[index].completed = true;
      }
    });
    setTodos(newTodos);
  };

  return (
    <div className="app-container">
      <h1>Todo List App</h1>
      {localStorage.getItem('logged_in') ? (
        <>
          <Login />
          <div>
            <input
              type="text"
              placeholder="What needs to be done?"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTodo(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompleted(index)}
                  />
                  <span
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                </li>
              ))}
            </ul>
            <button onClick={handleUndoCompleted}>Undo Completed</button>
          </div>
        </>
      ) : (
        <div>Please log in to access the Todo List App.</div>
      )}
    </div>
  );
}

export default App;