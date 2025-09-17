import React, { useState } from 'react';
import './App.css';

// Import local storage data
const storedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
const storedUserData = localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem('userdata')) : { username: '', password: '' };

// Function to authenticate user login
function authenticateUser(username, password) {
  if (username === storedUserData.username && password === storedUserData.password) {
    localStorage.setItem('logged_in', true);
    return true;
  }
  localStorage.setItem('logged_in', false);
  return false;
}

// Function to handle user registration
async function registerUser(username, password) {
  // You can replace this with your actual database or API call
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('userdata', JSON.stringify({ username, password }));
    return true;
  } else {
    return false;
  }
}

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (!username || !password || !confirmPassword) {
      setErrorMessages([...errorMessages, 'Please fill in all fields']);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessages([...errorMessages, 'Passwords do not match']);
      return;
    }
    const result = await registerUser(username, password);
    if (result) {
      window.location.href = '/login';
    } else {
      setErrorMessages([...errorMessages, 'Registration failed']);
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit">Signup</button>
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
  const [todos, setTodos] = useState(storedTodos);

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
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
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
        <div>
          <Login />
          <Signup />
        </div>
      )}
    </div>
  );
}

export default App;