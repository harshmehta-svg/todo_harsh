import React, { useState, useEffect } from 'react';
import './TodoList.css';
import { useNavigate, useParams, Link } from 'react-router-dom';

function TodoList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editedItem, setEditedItem] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (event) => {
    event.preventDefault();
    if (!newItem.trim()) {
      return;
    }
    const newItemObject = {
      id: Date.now(),
      text: newItem,
      completed: false,
    };
    setItems([...items, newItemObject]);
    setNewItem('');
  };

  const handleEditItem = (item) => {
    setEditedItem(item);
    setNewItem(item.text);
  };

  const handleSaveItem = (event) => {
    event.preventDefault();
    if (!newItem.trim()) {
      return;
    }
    const updatedItem = { ...editedItem, text: newItem };
    const updatedItems = items.map((item) => (item.id === editedItem.id ? updatedItem : item));
    setItems(updatedItems);
    setNewItem('');
    setEditedItem(null);
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleToggleCompleted = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleUndoItem = (id) => {
    const existingItem = items.find((item) => item.id === id);
    if (!existingItem) {
      return;
    }
    const updatedItems = items.filter((item) => item.id !== id);
    const newItem = { id, text: existingItem.text, completed: existingItem.completed };
    setItems([...updatedItems, newItem]);
  };

  return (
    <div>
      <h1>Todo List App</h1>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          placeholder="Enter a new item"
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editedItem && editedItem.id === item.id ? (
              <form onSubmit={handleSaveItem}>
                <input
                  type="text"
                  value={newItem}
                  onChange={(event) => setNewItem(event.target.value)}
                  placeholder="Enter a new item"
                />
                <button type="submit">Save Item</button>
              </form>
            ) : (
              <div>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleCompleted(item.id)}
                />
                <span
                  style={{
                    textDecoration: item.completed ? 'line-through' : 'none',
                  }}
                >
                  {item.text}
                </span>
                <button onClick={() => handleEditItem(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                <button onClick={() => handleUndoItem(item.id)}>Undo</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p>
        {' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default TodoList;