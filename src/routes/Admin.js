// src/routes/Admin.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { useAuthContext } from '../services/auth';
import { ADMIN_ROUTE } from '../utils/constants';

const AdminRoutes = () => {
  const { admin } = useAuthContext();

  return (
    <>
      {admin === true ? (
        <>
          <Route path={`${ADMIN_ROUTE}/dashboard`} element={<AdminDashboard />} />
          <Route path={`${ADMIN_ROUTE}/users`} element={<></>} />
          {/* Add more admin routes here */}
        </>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default AdminRoutes;