import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// Redux Toolkit and React Redux do not play well with a Redux store setup like this,
// because the Redux Toolkit reducer is not wrapped in a Redux store, but it's actually
// the store itself. As a workaround we don't export the store.

// Importing the store in this way is a common approach
import { Provider } from 'react-redux';

// This is where the magic happens for our app to work properly
import App from './App';

// Use the component in your code like this:
import './App.css';

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;