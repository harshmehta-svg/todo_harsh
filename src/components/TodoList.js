// Importing necessary dependencies
import React, { useState, useEffect } from 'react';
import useAnalytics from '../hooks/useAnalytics';

// Creating a useAnalytics hook to centralize event tracking
const useAnalyticsHook = () => {
  const { track, addGlobalContext } = useAnalytics();
  useEffect(() => {
    // Add global context like user, company, and region
    addGlobalContext({
      user: 'John Doe',
      company: 'Todo App Inc.',
      region: 'North America',
    });

    // Track user actions
    track('task_added', { task: { id: 1, text: 'New Todo' } });

    return () => {
      track('task_removed', { task: { id: 1, text: 'New Todo' } });
    };
  }, []);
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useAnalyticsHook();

  const handleModeSwitch = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleAddTodo = () => {
    setTodos([...todos, { id: Math.random().toString(36).substring(2, 15), text: newTodo, completed: false }]);
    setNewTodo('');
    useAnalytics().track('task_added', { task: { id: Math.random().toString(36).substring(2, 15), text: newTodo } });
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    useAnalytics().track('task_removed', { task: { id, text: 'New Todo' } });
  };

  const handleCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
    useAnalytics().track('task_completed', { task: { id, text: 'New Todo' } });
  };

  const handleUndoCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: false } : todo))
    );
    useAnalytics().track('task_undone', { task: { id, text: 'New Todo' } });
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
  );
};

export default TodoList;