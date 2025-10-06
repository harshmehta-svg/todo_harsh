// src/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
    checkSession(state, action) {
      if (action.payload.token && action.payload.user) {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      }
    },
  },
});

export const { login, logOut, checkSession } = authSlice.actions;

// Thunks
export const loginAsync = () => async (dispatch) => {
  const storedData = await AsyncStorage.getItem('storedData');
  const data = JSON.parse(storedData);
  if (data) {
    dispatch(checkSession({ token: data.token, user: data.user }));
  }
};

export const authActionCreator = (actionName, data) => (dispatch) => {
  if (actionName === 'login') {
    return dispatch(login(data));
  }
  if (actionName === 'logOut') {
    return dispatch(logOut());
  }
  if (actionName === 'checkSession') {
    dispatch(checkSession(data));
    return data;
  }
};

// Export reducers and get the store
export default authSlice.reducer;