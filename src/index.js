// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Removed index.html reference and related code

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

export default App;

// Removed index.html reference from serviceWorker

if (process.env.NODE_ENV === 'development') {
  const { registerServiceWorker } = require('./registerServiceWorker');
  registerServiceWorker();
}

// Removed index.html reference from registerServiceWorker
import { unregister } from './serviceWorker';

unregister();

// Removed index.html reference