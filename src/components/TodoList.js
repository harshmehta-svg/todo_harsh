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
    settodos(todos.filter((todo) => todo.id !== id));
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
      className={`todo-list ${darkMode ? 'dark-mode' : ''}`}
      style={{
        backgroundColor: 'grey',
        backgroundSize: 'cover', // add this line
        backgroundRepeat: 'no-repeat', // add this line
        backgroundPosition: 'center', // add this line
        backgroundAttachment: 'scroll', // add this line
        backgroundImage: 'none', // add this line
        backgroundClip: 'border-box', // add this line
        webkitBackgroundClip: 'border-box', // add this line
        backgroundOrigin: 'padding-box', // add this line
        webkitBackgroundOrigin: 'padding-box', // add this line
        backgroundSize: 'initial', // add this line
        backgroundRepeat: 'initial', // add this line
        backgroundPosition: 'initial', // add this line
        backgroundAttachment: 'initial', // add this line
        backgroundImage: 'none', // add this line
        backgroundClip: 'initial', // add this line
        webkitBackgroundClip: 'initial', // add this line
        backgroundOrigin: 'initial', // add this line
        webkitBackgroundOrigin: 'initial', // add this line
        color: darkMode ? '#fff' : '#333'
      }}
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