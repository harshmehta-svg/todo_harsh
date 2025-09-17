import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './App.css';

// Import local storage data
const storedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
const storedUserData = localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem('userdata')) : { username: '', password: '', hashedPassword: '' };

// Function to authenticate user login
function authenticateUser(username, password) {
  if (username === storedUserData.username && bcrypt.compareSync(password, storedUserData.hashedPassword)) {
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

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (!username || !password) {
      setErrorMessages([...errorMessages, 'Please fill in all fields']);
      return;
    }
    if (authenticateUser(username, password)) {
      window.location.href = '/todo';
    } else {
      setErrorMessages([...errorMessages, 'Invalid username or password']);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (!username || !password) {
      setErrorMessages([...errorMessages, 'Please fill in all fields']);
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    storedUserData.username = username;
    storedUserData.hashedPassword = hashedPassword;
    localStorage.setItem('userdata', JSON.stringify(storedUserData));
    window.location.href = '/todo';
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
        <button type="submit">Login</button>
      </form>
      <hr />
      <p>Don't have an account? <a href="#" onClick={handleRegister}>Register</a></p>
      {errorMessages && (
        <div className="error-message">
          {errorMessages.map((message, index) => (
            <span key={index}>{message}</span>
          ))}
        </div>
      )}
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
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;