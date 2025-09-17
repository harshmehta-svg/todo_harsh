// src/TodoList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// New import for the login logic
import Login from './Login';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get('/api/tasks')
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setTasks([]);
    }
  }, [isLoggedIn]);

  const handleAddTask = newTask => {
    const currentTasks = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(currentTasks));
    setTasks(currentTasks);
  };

  const handleDeleteTask = taskToDelete => {
    const filteredTasks = tasks.filter(task => task.id !== taskToDelete.id);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    setTasks(filteredTasks);
  };

  const handleToggleCompletion = task => {
    const updatedTask = { ...task, completed: !task.completed };
    const updatedTasks = tasks.map(t => (t.id === task.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleLoginChange = loginStatus => {
    setIsLoggedIn(loginStatus);
    localStorage.setItem('isLoggedIn', loginStatus);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {tasks.map(task => (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompletion(task)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.name}
              </span>
              <button onClick={() => handleDeleteTask(task)}>Delete</button>
            </div>
          ))}
          <input
            type="text"
            placeholder="Enter new task name"
            onChange={event =>
              handleAddTask({ name: event.target.value, id: tasks.length + 1 })
            }
          />
        </div>
      ) : (
        <Login handleLoginChange={handleLoginChange} />
      )}
    </div>
  );
}

export default TodoList;