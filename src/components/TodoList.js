import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem('darkMode') === 'true');
  const [signUpFormData, setSignUpFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const history = useHistory();

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

  const handleSignUpChange = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = signUpFormData;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Add API call to create new user account here
    history.push('/todo-list');
  };

  return (
    <div
      className={`todo-list ${darkMode ? 'dark-mode' : ''}`}
      style={{
        background: darkMode ? '#333' : '#f0f0f0',
        color: darkMode ? '#fff' : '#333'
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
      <button className="sign-up-btn" onClick={() => console.log('Sign up button clicked')}>
        Sign Up
      </button>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={signUpFormData.email}
          name="email"
          onChange={handleSignUpChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={signUpFormData.password}
          name="password"
          onChange={handleSignUpChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={signUpFormData.confirmPassword}
          name="confirmPassword"
          onChange={handleSignUpChange}
        />
        <button className="sign-up-btn" type="submit">
          Sign Up
        </button>
      </form>
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
    </div>
  );
};

export default TodoList;