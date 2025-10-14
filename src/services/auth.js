// src/services/auth.js

import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { storedValue, setStoredValue } = useLocalStorage('auth', {});

  useEffect(() => {
    const storedUser = storedValue;
    if (storedUser?.user && storedUser?.token) {
      setUser(storedUser.user);
      setToken(storedUser.token);
    } else {
      setUser(null);
      setToken(null);
    }
  }, [storedValue]);

  const login = (user, token) => {
    setStoredValue({ user, token });
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setStoredValue({ user: null, token: null });
    setUser(null);
    setToken(null);
  };

  return { user, token, login, logout };
};

export default useAuth;