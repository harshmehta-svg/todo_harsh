import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newUser, setUser] = useState('');
  const [newEmail, setEmail] = useState('');
  const [newPhone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

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

  const handleAddUser = () => {
    setUsers([...users, { id: Math.random().toString(36).substring(2, 15), username: newUser, email: newEmail, phone: newPhone }]);
    setUser('');
    setEmail('');
    setPhone('');
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
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
      <input
        type="text"
        placeholder="New Username"
        value={newUser}
        onChange={(e) => setUser(e.target.value)}
      />
      <button className="add-user" onClick={() => handleAddUser()}>
        Add User
      </button>
      <input
        type="email"
        placeholder="New Email"
        value={newEmail}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Phone Number"
        value={newPhone}
        onChange={(e) => setPhone(e.target.value)}
      />
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
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.username}</span>
            <span style={{ color: 'blue' }}>{user.email}</span>
            <span style={{ color: 'green' }}>{user.phone}</span>
            <button className="delete-user" onClick={() => handleDeleteUser(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;