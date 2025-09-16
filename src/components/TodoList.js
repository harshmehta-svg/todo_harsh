import React from 'react';
import { useReducer } from 'react';

const initialState = {
  todos: [],
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
  newTodo: '',
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.todo] };
    case 'TOGGLE_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_TODO':
      return { ...state, newTodo: action.newTodo };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
    case 'COMPLETE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'UNDO_COMPLETE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: false } : todo
        ),
      };
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleModeSwitch = () => {
    dispatch({ type: 'TOGGLE_MODE' });
    localStorage.setItem('darkMode', state.darkMode);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: Math.random().toString(36).substring(2, 15),
      text: state.newTodo,
      completed: false,
    };
    dispatch({ type: 'ADD_TODO', todo: newTodo });
    dispatch({ type: 'SET_TODO', newTodo: '' });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', id });
  };

  const handleCompleteTodo = (id) => {
    dispatch({ type: 'COMPLETE_TODO', id });
  };

  const handleUndoCompleteTodo = (id) => {
    dispatch({ type: 'UNDO_COMPLETE_TODO', id });
  };

  return (
    <div
      className={`todo-list ${state.darkMode ? 'dark-mode' : ''}`}
      style={{
        background: state.darkMode ? '#333' : '#f0f0f0',
        color: state.darkMode ? '#fff' : '#333',
      }}
    >
      <h2>Todo List</h2>
      <button className="mode-switch" onClick={handleModeSwitch}>
        {state.darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <input
        type="text"
        placeholder="New Todo..."
        value={state.newTodo}
        onChange={(e) => dispatch({ type: 'SET_TODO', newTodo: e.target.value })}
      />
      <button className="add-todo" onClick={handleAddTodo}>
        Add Todo
      </button>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCompleteTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              className="delete-todo"
              onClick={() => handleDeleteTodo(todo.id)}
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
    </div>
  );
};

export default TodoList;