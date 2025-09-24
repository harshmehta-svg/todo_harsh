// scripts/script.js

// Importing necessary dependencies and libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Setting up authentication functionality
import authApi from './api/auth';
import { userStorageKey } from './utils/constants';

// Setting up dark mode functionality
import { useDarkMode } from './hooks/useDarkMode';
import './style/dark-theme.css';

// Defining main application component
function MainComponent() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <main className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header>
        <h1>Todo List</h1>
      </header>
      <BrowserRouter>
        <AuthProvider>
          <StoreProvider>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<App toggleDarkMode={toggleDarkMode} />} />
              </Routes>
            </ThemeProvider>
          </StoreProvider>
        </AuthProvider>
      </BrowserRouter>
    </main>
  );
}

// Initializing dark mode
const isDarkMode = localStorage.getItem('darkMode') === 'true';
document.body.classList.toggle('dark-mode', isDarkMode);

// Initializing the MainComponent in the root element
ReactDOM.render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>,
  document.getElementById('root')
);