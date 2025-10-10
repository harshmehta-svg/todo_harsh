// src/routes/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TodoListPage from './TodoListPage';
import TaskPage from './TaskPage';
import AdminDashboardPage from './AdminDashboardPage';

// Import required authentication services
import authServices from '../scripts/services/auth';

// Modified code for role-based access
function PrivateRoutes({ children }) {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          authServices.isAdmin() ? children : <div>Access denied!</div>
        }
      />
    </Routes>
  );
}

function AdminRoutes({ children }) {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          authServices.isAdmin() ? children : <div>Access denied!</div>
        }
      />
    </Routes>
  );
}

function HomePageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoListPage />} />
        <Route path="/tasks/:todoId" element={<TaskPage />} />
      </Routes>
    </>
  );
}

function AdminPageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <AdminRoutes>
        <HomePageRoutes />
        <AdminPageRoutes />
      </AdminRoutes>
      <PrivateRoutes>
        <HomePageRoutes />
      </PrivateRoutes>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppRoutes />} />
    </Routes>
  );
}

export default App;