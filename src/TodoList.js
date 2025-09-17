// New file

// src/TodoList.js

import React, { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState('');
  const [taskIndex, setTaskIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length, text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
  };

  const undoCompletedTask = () => {
    if (taskIndex !== null) {
      const updatedTasks = tasks.map((task, i) => (i === taskIndex ? { ...task, completed: false } : task));
      setTasks(updatedTasks);
      setTaskIndex(null);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task) => task.id !== index);
    setTasks(updatedTasks);
  };

  // Add new task_0 functionality
  const addTask_0 = () => {
    const newTaskId = 0;
    const newTaskText = 'Task 0';
    const newTaskCompleted = false;
    setTasks([
      ...tasks,
      { id: newTaskId, text: newTaskText, completed: newTaskCompleted },
    ]);
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>
      <button onClick={addTask_0}>Add task_0</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(index)}
            />
            {task.text}
            {task.completed && (
              <button onClick={() => undoCompletedTask(index)}>Undo</button>
            )}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;