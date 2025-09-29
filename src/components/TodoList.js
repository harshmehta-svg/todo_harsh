import React, { useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleModeSwitch = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleAddTodo = async () => {
    const todoData = await axios.post('/api/todos', { text: newTodo });
    setTodos([...todos, { id: todoData.data.id, text: newTodo, completed: false }]);
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

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/register', userData);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`todo-list ${darkMode ? 'dark-mode' : ''}`}
      style={{ background: darkMode ? '#333' : '#f0f0f0', color: darkMode ? '#fff' : '#333' }}
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
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCompleteTodo(todo.id)}
            />
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
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmitSignup}>
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default TodoList;