// @flow

import React, { useState } from 'react';
import './App.css';

// import TodoListTable component and its styles
import TodoListTable from './components/TodoListTable';
import './components/TodoListTable.css';

function App() {
  // state for dark mode
  const [darkMode, setDarkMode] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [todoList, setTodoList] = useState([]);

  const handleLogin = (event: any) => {
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

  const addItemToList = (todoItem) => {
    setTodoList([...todoList, { id: todoList.length + 1, text: todoItem, completed: false }]);
  };

  const handleCheckboxClick = (id) => {
    setTodoList(
      todoList.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, completed: !todoItem.completed } : todoItem
      )
    );
  };

  const handleDeleteItem = (id) => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
  };

  const handleUndoItem = (id) => {
    setTodoList(
      todoList.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, completed: !todoItem.completed } : todoItem
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.setAttribute('class', darkMode ? 'dark-mode' : '');
    document.body.removeAttribute('class', darkMode ? '' : 'dark-mode');
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}! <button onClick={handleLogout}>Logout</button>
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
        <button className="toggle-mode-button" onClick={toggleDarkMode}>
          Toggle Mode
        </button>
      </header>
      <TodoListTable
        todoList={todoList}
        addItemToList={addItemToList}
        handleCheckboxClick={handleCheckboxClick}
        handleDeleteItem={handleDeleteItem}
        handleUndoItem={handleUndoItem}
      />
    </div>
  );
}

export default App;

// new styles for dark mode
/* global styles
.dark-mode {
  background-color: #333;
  color: #fff;
}
*/