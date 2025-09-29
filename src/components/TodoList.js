import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem('darkMode') === 'true');
  const [login, setLogin] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://example.com/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setLogin(true);
      navigate('/todo');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogin(false);
    navigate('/todo');
  };

  return (
    <div className={`todo-list ${darkMode ? 'dark-mode' : ''}`} style={{ background: darkMode ? '#333' : '#f0f0f0', color: darkMode ? '#fff' : '#333' }}>
      {login ? (
        <div>
          <h2>Todo List</h2>
          <button className="mode-switch" onClick={handleModeSwitch}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <input type="text" placeholder="New Todo..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
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
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="submit">Login</button>
            <p style={{ color: 'red' }}>{error}</p>
            <Link to="/register">Register</Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default TodoList;