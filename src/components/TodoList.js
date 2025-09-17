import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [signedUp, setSignedUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (signedUp) {
      localStorage.setItem('signedUp', JSON.stringify(signedUp));
    }
  }, [signedUp]);

  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

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

  const handleSignUp = async () => {
    try {
      const response = await axios.post('https://example.com/api/signup', {
        username,
        password
      });

      setSignedUp(true);
    } catch (error) {
      setError('Error signing up');
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('https://example.com/api/signin', {
        username,
        password
      });

      // handle successful sign in
    } catch (error) {
      setError('Error signing in');
    }
  };

  return (
    <div
      className={`todo-list ${darkMode ? 'dark-mode' : ''}`}
      style={{ background: darkMode ? '#333' : '#f0f0f0', color: darkMode ? '#fff' : '#333' }}
    >
      <h2>Todo List</h2>
      {signedUp ? (
        <div>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div>
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
          )}
        </div>
      ) : (
        <div>
          <h3>Sign Up or Sign In</h3>
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
          <button className="sign-up" onClick={handleSignUp}>
            Sign Up
          </button>
          <button className="sign-in" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;