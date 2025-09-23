import React from 'react';
import './TodoList.css';
import './UserList.css';

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem('darkMode') === 'true');
  const [users, setUsers] = React.useState([]);

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
    const newUsers = [...users, { id: Math.random().toString(36).substring(2, 15), username: '', email: '', phone: '' }];
    setUsers(newUsers);
  };

  const handleUpdateUsername = (id, username) => {
    const updateUser = users.map((user) => (user.id === id ? { ...user, username } : user));
    setUsers(updateUser);
  };

  const handleUpdateEmail = (id, email) => {
    const updateUser = users.map((user) => (user.id === id ? { ...user, email } : user));
    setUsers(updateUser);
  };

  const handleUpdatePhone = (id, phone) => {
    const updateUser = users.map((user) => (user.id === id ? { ...user, phone } : user));
    setUsers(updateUser);
  };

  const handleDeleteUser = (id) => {
    const deleteUsers = users.filter((user) => user.id !== id);
    setUsers(deleteUsers);
  };

  return (
    <div className={`todo-list ${darkMode ? 'dark-mode' : ''}`} style={{ background: darkMode ? '#333' : '#f0f0f0', color: darkMode ? '#fff' : '#333' }}>
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
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input type="text" placeholder="Username" value={user.username} onChange={(e) => handleUpdateUsername(user.id, e.target.value)} />
            <input type="email" placeholder="Email" value={user.email} onChange={(e) => handleUpdateEmail(user.id, e.target.value)} />
            <input type="phone" placeholder="Phone" value={user.phone} onChange={(e) => handleUpdatePhone(user.id, e.target.value)} />
            <button className="delete-user" onClick={() => handleDeleteUser(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button className="add-user" onClick={handleAddUser}>
        Add User
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