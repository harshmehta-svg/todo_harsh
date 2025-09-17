// React
// Import React and necessary libraries
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// Import CSS
import './styles.css';
import './index.scss';

// Import Components
import App from './components/App';
import Header from './components/Header';
import Form from './components/Form';
import Login from './components/Login';
import Signup from './components/Signup';

// Import React Router
import Router from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Local Storage
import store from './store';

// Import Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// Configure Store
const store = configureStore();

// App Function
function AppWrapper() {
  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Functions
  const loginUser = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      setIsLoggedIn(true);
      return response.data;
    } catch (error) {
      return { status: 'error' };
    }
  };

  const signupUser = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return { status: 'error' };
    }
  };

  // JSX
  return (
    <Router>
      <Provider store={store}>
        <Header isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/login">
            <Login onLogin={loginUser} />
          </Route>
          <Route path="/signup">
            <Signup onSignup={signupUser} />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
}

// Render
const rootElement = document.getElementById('root');
ReactDOM.render(<AppWrapper />, rootElement);