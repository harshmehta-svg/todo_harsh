// New file

import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [todoItems, setTodoItems] = useState(
    JSON.parse(localStorage.getItem('todoItems')) || []
  );
  const [newItem, setNewItem] = useState('');
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }, [todoItems]);

  const handleAddItem = (event) => {
    event.preventDefault();
    if (!editedItem) {
      setTodoItems([...todoItems, { text: newItem, completed: false }]);
      setNewItem('');
    } else {
      setEditedItem(null);
      setIsEditing(false);
    }
  };

  const handleDeleteItem = (index) => {
    setTodoItems(todoItems.filter((_, i) => i !== index));
  };

  const handleCheckItem = (index) => {
    setTodoItems(
      todoItems.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleEditItem = (index) => {
    const item = todoItems[index];
    setEditedItem(item.text);
    setIsEditing(true);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();
    if (editedItem) {
      const updatedItems = todoItems.map((item, i) =>
        i === todoItems.findIndex((item1) => item1.text === editedItem) ? { text: newItem, completed: false } : item
      );
      setTodoItems(updatedItems);
      setEditedItem(null);
      setIsEditing(false);
      setNewItem('');
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={isEditing ? handleSaveEdit : handleAddItem}>
        <input
          type="text"
          value={isEditing ? newItem : editedItem || ''}
          onChange={(event) => (isEditing ? setNewItem(event.target.value) : setEditedItem(event.target.value))}
          className={isEditing ? 'edit-item' : 'add-item'}
        />
        <button type="submit" className="btn">
          {isEditing ? 'Save Edits' : 'Add Item'}
        </button>
      </form>
      <ul>
        {todoItems.map((item, index) => (
          <li key={index} className={`${item.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheckItem(index)}
              className="checkbox"
            />
            <span className="text">{item.text}</span>
            <button type="button" className="delete-btn" onClick={() => handleDeleteItem(index)}>
              Delete
            </button>
            <button
              type="button"
              className="edit-btn"
              onClick={() => handleEditItem(index)}
              disabled={isEditing && newItem !== ''}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;