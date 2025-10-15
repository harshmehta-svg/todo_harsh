import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ConfirmDeleteModal = ({ visible, onClose, onConfirm }) => {
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = () => {
    setConfirm(true);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    onConfirm();
  };

  return (
    <motion.div
      animate={visible ? 'visible' : 'hidden'}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="confirm-delete-modal"
    >
      <div
        className="modal-overlay"
        onClick={handleCancel}
      />
      <div
        className="modal-content"
      >
        <h2>Delete Todo?</h2>
        <p>Are you sure you want to delete this Todo?</p>
        <div className="modal-actions">
          <button onClick={handleConfirm}>
            Delete
          </button>
          <button onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem('darkMode') === 'true');
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState(null);

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
    setShowModal(false);
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

  const handleConfirmDelete = (id) => {
    setSelectedTodo(id);
    setShowModal(true);
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
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button
              className="delete-todo"
              onClick={() => handleConfirmDelete(todo.id)}
            >
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
      {showModal && (
        <ConfirmDeleteModal
          visible={true}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDeleteTodo(selectedTodo)}
        />
      )}
    </div>
  );
};

export default TodoList;
