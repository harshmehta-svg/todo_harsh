// src/TodoList.js

import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleUpdate = (todo) => {
    const newTodos = todos.map((item) => (item.id === todo.id ? { ...item, title: todo.title, completed: todo.completed } : item));
    setTodos(newTodos);
    setCurrentTodo({ id: 0, title: '', completed: false });
    setEditing(false);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleToggle = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleEdit = (todo) => {
    setEditing(true);
    setCurrentTodo(todo);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setCurrentTodo({ id: 0, title: '', completed: false });
      setEditing(false);
    }
  };

  return (
    <div>
    <Header>Todo List</Header>
      {editing ? (
        <TodoForm
          todo={currentTodo}
          handleUpdate={handleUpdate}
          handleKeyDown={handleKeyDown}
        />
      ) : (
        <TodoList
          todos={todos}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default TodoList;
