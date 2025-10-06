import React, { useState } from 'react';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')

  const { data, error, isLoading } = useQuery(['posts'], async () => {
    const response = await fetch('/api/posts')
    return response.json()
  },
  {
    staleTime: 1000 * 60,  // 1 minute
    cacheTime: 0,
    refetchOnWindowFocus: false,
  }
  )

  const handleModeSwitch = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', !darkMode)
  };

  const handleAddTodo = async () => {
    const postData = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newTodo, completed: false }),
    })
    const newTodoData = await postData.json()
    if(newTodoData.success) {
      setTodos([...todos, { id: newTodoData.data.id, text: newTodo, completed: false }])
      setNewTodo('')
      await queryClient.invalidateQueries(['posts'])
    } else {
      alert(newTodoData.error)
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    queryClient.deleteQuery(['posts', id])
  };

  const handleCompleteTodo = async (id) => {
    const putData = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !todos.find((todo) => todo.id === id).completed })
    })
    const newTodoData = await putData.json()
    if(newTodoData.success) {
      setTodos(
        todos.map((todo) =>
          (todo.id === id ? { ...todo, completed: newTodoData.data.completed } : todo)
        )
      )
      await queryClient.invalidateQueries(['posts'])
    } else {
      alert(newTodoData.error)
    }
  };

  const handleUndoCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        (todo.id === id ? { ...todo, completed: false } : todo)
      )
    );
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
        {data ? data.map((todo) => (
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
        )) : 'Loading...'}
      </ul>
    </div>
  );
};

export default TodoList;