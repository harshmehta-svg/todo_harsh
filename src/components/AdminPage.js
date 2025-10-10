// src/components/AdminPage.js

import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

// Assuming the admin routes are protected by Route component from react-router-dom
function AdminPage() {
  const location = useLocation();
  const isAdmin = localStorage.getItem('role') === 'admin'; // Assuming role is stored in local storage

  if (!isAdmin) {
    // If user is not an admin, redirect them to home page
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    // Your admin page content goes here
    <div>
      <h1>Admin Page</h1>
      <p>This is the admin page.</p>
    </div>
  );
}

export default AdminPage;