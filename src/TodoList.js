// src/TodoList.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('darkMode', darkMode.toString());
  }, [tasks, darkMode]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <header>
        <h1>Todo List</h1>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <section>
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? handleAddTask() : '')}
        />
      </section>
      <section>
        <ul>
          {tasks.map((task, index) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  setTasks((prevTasks) =>
                    prevTasks.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
              />
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'gray' : 'black',
                }}
              >
                {task.text}
              </span>
              <button onClick={() => setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))}>
                X
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));