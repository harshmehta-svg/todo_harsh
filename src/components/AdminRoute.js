// src/components/AdminRoute.js

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/authSlice';
import { PATHS } from '../constants/paths';

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  if (user.role !== 'admin') {
    navigate(PATHS.HOME);
  }

  return children;
};

export default AdminRoute;