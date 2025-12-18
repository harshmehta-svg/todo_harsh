import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <button className="nav-button">Home</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/todos" className="nav-link">
              <button className="nav-button">Todos</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              <button className="nav-button">About</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              <button className="nav-button">Contact</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <button className="nav-button">Settings</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;