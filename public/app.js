// Public directory
public/app.js

// Import required libraries and components
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './src/components/TodoList.js';
import Task from './src/components/Task.js';
import styles from './src/styles/styles.css';
import script from './src/scripts/script.js';
import { auth } from './src/scripts/services/auth.js';
import AIChatBot from './src/AIChatBot.js'; // Import AIChatBot.js

// Create a React App
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Modern Todo List App</h2>
      </div>
      <TodoList />
      <Task />
      <AIChatBot /> // Render the AIChatBot component
    </div>
  );
}

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);