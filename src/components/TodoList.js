import React, { useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setLogin(true);
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLogin(false);
    setLogin(false);
  };

  return (
    <div>
      {login ? (
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
      {login ? (
        <div>
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
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
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
        </div>
      ) : (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;