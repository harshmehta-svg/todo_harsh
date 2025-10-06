// src/services/auth.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the initial state
const initialState = {
  isLoggedIn: false,
  user: null,
};

// Create a Redux slice called authSlice with actions for login, logout, and checking session
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    // Action to handle the login process
    login(state, action: PayloadAction<{ user: any, isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    // Action to handle the logout process
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    // Action to handle checking the session
    checkSession(state, action: PayloadAction<{ isLoggedIn: boolean, user: any }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
});

// Export the actions
export const { login, logout, checkSession } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// Selectors
export const selectAuthToken = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;