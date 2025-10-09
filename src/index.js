import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, NavLink, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This is the about page.</p>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Navbar component
// src/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const links = [
    { text: 'Home', to: '/' },
    { text: 'About', to: '/about' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Logo
      </Link>
      <div className="links">
        {links.map((link) => (
          <NavLink exact to={link.to} key={link.to}>
            {link.text}
          </NavLink>
        ))}
      </div>
      <div className="dropdown">
        <div className="dropdown-button" onClick={handleToggle}>
          Profile
          <i className="fas fa-angle-down"></i>
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/profile">Profile Settings</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;