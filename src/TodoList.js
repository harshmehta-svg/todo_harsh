// src/TodoList.js

import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
    const [todoItems, setTodoItems] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [id, setId] = useState(0);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodoItems(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoItems));
    }, [todoItems]);

    const addTodo = () => {
        if (newTodo) {
            setTodoItems([...todoItems, { id: id + 1, todo: newTodo, completed: false }]);
            setNewTodo('');
            setId(id + 1);
        }
    };

    const toggleCompleted = (id) => {
        const updatedTodos = todoItems.map((todo) => {
            return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
        });
        setTodoItems(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todoItems.filter((todo) => todo.id !== id);
        setTodoItems(updatedTodos);
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter new todo"
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todoItems.map((todo, index) => (
                    <li key={index}>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.todo}
                        </span>
                        <button onClick={() => toggleCompleted(todo.id)}>Toggle</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;