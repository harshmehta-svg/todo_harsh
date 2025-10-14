// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import useLocalStorage from './useLocalStorage';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [todos, setTodos] = useLocalStorage('todos', []);

  const handleLogin = (event:SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  const handleAddTodo = (newTodo: any) => {
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (deletedTodo: any) => {
    const updatedTodos = todos.filter((todo) => todo !== deletedTodo);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}!
            <button onClick={handleLogout}>Logout</button>
          </h2>
        ) : (
          loginStatus === false && (
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          )
        )}
      </header>
      <TodoList todos={todos} handleAddTodo={handleAddTodo} handleDeleteTodo={handleDeleteTodo} />
    </div>
  );
}

function TodoList({ todos, handleAddTodo, handleDeleteTodo }: any) {
  const [newTodo, setNewTodo] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAddNewTodo = (event: SyntheticEvent) => {
    event.preventDefault();
    handleAddTodo(newTodo);
    setNewTodo('');
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`todo-list ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2>Todo List</h2>
      <form onSubmit={handleAddNewTodo}>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button type="submit">Add</button>
        <button onClick={handleToggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;