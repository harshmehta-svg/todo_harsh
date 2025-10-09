import React from 'react';

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem('darkMode') === 'true');

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

  return (
    <div
      className="dashboard-container"
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <header className="header flex justify-between items-center p-4 bg-gray-600 text-white">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <button className="mode-switch" onClick={handleModeSwitch}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <aside
        className="sidebar flex flex-col bg-gray-300 w-64 p-4 text-gray-800"
        style={{ height: '100vh' }}
      >
        <h2 className="text-lg font-bold mb-4">Sidebar</h2>
        <ul className="list-none mb-4">
          <li className="mb-2">
            <a
              href="#"
              className="block py-2 mb-2 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              Todo 1
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="block py-2 mb-2 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              Todo 2
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="block py-2 mb-2 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              Todo 3
            </a>
          </li>
        </ul>
      </aside>
      <main
        className="main-content flex-1 p-4 bg-gray-100 overflow-y-auto"
        style={{ height: '100vh' }}
      >
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <input
          type="text"
          placeholder="New Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleAddTodo}>
          Add Todo
        </button>
        <ul className="mb-4">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompleteTodo(todo.id)}
                className="mr-2"
              />
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.text}
              </span>
              <button
                className="delete-todo ml-4"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
              <button
                className="undo-complete-todo ml-4"
                onClick={() => handleUndoCompleteTodo(todo.id)}
                style={{ display: todo.completed ? 'inline-block' : 'none' }}
              >
                Undo
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default TodoList;