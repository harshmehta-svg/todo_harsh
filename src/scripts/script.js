import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-sortable-hoc/stylesheet.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';

// Import local storage data
const storedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
const storedUserData = localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem('userdata')) : { username: '', password: '' };

// Function to authenticate user login
function authenticateUser(username, password) {
  if (username === storedUserData.username && password === storedUserData.password) {
    localStorage.setItem('logged_in', true);
    return true;
  }
  localStorage.setItem('logged_in', false);
  return false;
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (!username || !password) {
      setErrorMessages([...errorMessages, 'Please fill in all fields']);
      return;
    }
    if (authenticateUser(username, password)) {
      window.location.href = '/todo';
    } else {
      setErrorMessages([...errorMessages, 'Invalid username or password']);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {errorMessages && (
          <div className="error-message">
            {errorMessages.map((message, index) => (
              <span key={index}>{message}</span>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

function App() {
  // Get existing todos from local storage
  const [todos, setTodos] = useState(storedTodos);

  // State for displaying todo list
  const [showCompleted, setShowCompleted] = useState(false);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, { text: newTodo, completed: false }]);
    // Save data in local storage
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleToggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleUndoCompleted = () => {
    const newTodos = [...todos];
    newTodos.reverse();
    newTodos.forEach((todo, index) => {
      if (index < Math.floor(newTodos.length / 2)) {
        newTodos[index].completed = false;
      } else {
        newTodos[index].completed = true;
      }
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://example.com/api/data');
        const data = response.data;
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      name: 'Username',
      selector: 'username',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
    },
    {
      name: 'Country',
      selector: 'country',
      sortable: true,
    },
  ];

  return (
    <div className="app-container">
      <h1>Data Table App</h1>
      {localStorage.getItem('logged_in') ? (
        <div>
          <DataTable
            title="Data Table"
            columns={columns}
            data={todos}
            pageable
            pagination
            selectableRows
          />
        </div>
      ) : (
        <div>Please log in to access the Data Table App.</div>
      )}
    </div>
  );
}

export default App;