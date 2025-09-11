import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Added the src folder and its files
import App from './src/App.js';
import './src/App.css';
import './src/index.js';
import './src/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Export the App component as default
export default App;