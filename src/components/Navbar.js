import React, { useState } from 'react';
import Logo from './Logo';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'navbar-open' : ''}`}>
      <div className="container">
        <Logo />
        <ul className="nav-links">
          <li>
            <a href="#" className="nav-link">
              Link 1
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Link 2
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Link 3
            </a>
          </li>
        </ul>
        <button onClick={toggleMenu} className="hamburger-menu">
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;