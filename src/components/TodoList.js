import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    axios.get('/api/auth/check')
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          axios.get('/api/user/data')
            .then(response => {
              setUser(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleLogin = () => {
    axios.post('/api/auth/login', {
      username: 'test',
      password: 'test'
    })
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          axios.get('/api/user/data')
            .then(response => {
              setUser(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    axios.post('/api/auth/logout')
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch(error => {
        console.error(error);
      });
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
      {isLoggedIn ? (
        <button className="add-todo" onClick={handleAddTodo}>
          Add Todo
        </button>
      ) : (
        <button className="add-todo" onClick={handleLogin}>
          Login to add tasks
        </button>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleCompleteTodo(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            {isLoggedIn ? (
              <button
                className="delete-todo"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            ) : (
              <button className="delete-todo" disabled>
                Delete
              </button>
            )}
            {isLoggedIn ? (
              <button
                className="undo-complete-todo"
                onClick={() => handleUndoCompleteTodo(todo.id)}
                style={{ display: todo.completed ? 'inline-block' : 'none' }}
              >
                Undo
              </button>
            ) : (
              <button
                className="undo-complete-todo"
                style={{ display: 'none' }}
              >
                Undo
              </button>
            )}
          </li>
        ))}
      </ul>
      {isLoggedIn ? (
        <button className="logout-todo" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="logout-todo" disabled>
          Logout
        </button>
      )}
    </div>
  );
};

export default TodoList;