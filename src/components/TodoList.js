import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import TodoListPage from './TodoListPage';
import RegisterPage from './RegisterPage';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [auth, setAuth] = useState({isAuthenticated: false, token: ''});

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

  const handleLogin = (loginData) => {
    // implement login logic
    setAuth({ isAuthenticated: true, token: 'token' });
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, token: '' });
  };

  const handleRegister = (registerData) => {
    // implement register logic
    setAuth({ isAuthenticated: true, token: 'token' });
  };

  return (
    <div>
      {
        auth.isAuthenticated 
          ? <Routes>
              <Route path="/" element={<TodoListPage todos={todos} setTodos={setTodos} newTodo={newTodo} setNewTodo={setNewTodo} darkMode={darkMode} setDarkMode={setDarkMode} handleAddTodo={handleAddTodo} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo} handleUndoCompleteTodo={handleUndoCompleteTodo} />} />
              <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterPage handleRegister={handleRegister} />} />
            </Routes> 
          : 
          <Routes>
            <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
            <Route path="*' " element={<RegisterPage handleRegister={handleRegister} />} />
          </Routes>
      }
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
    </div>
  );
};

export default TodoList;