// @flow
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    localStorage.setItem('tasks', JSON.stringify([...prevTasks, task]));
  };

  const handleEditTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
    localStorage.setItem(
      'tasks',
      JSON.stringify(
        tasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    localStorage.setItem(
      'tasks',
      JSON.stringify(tasks.filter((task) => task.id !== id))
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <>
            <h2>
              Welcome, {username}! <button onClick={handleLogout}>Logout</button>
            </h2>
            <TodoList
              tasks={tasks}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </>
        ) : (
          loginStatus === false && (
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          )
        )}
      </header>
    </div>
  );
}

export default App;