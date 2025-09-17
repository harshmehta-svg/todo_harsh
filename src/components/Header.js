// src/components/Header.js
// @flow

import React, { useState } from 'react';
import { FaSearch, FaUser, FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type Props = {
  // Props type definition
};

const Header = ({ props }): React$Element<'header'> => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header>
      <div className="logo"> <span> <FaBars onClick={toggleNavbar} /> </span> <span>
        Task Manager
      </span> </div>
      <div className="navbar">
        <ul className={isNavbarOpen ? "navbar-open" : ''}>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          <li className="login-register">
            <button onClick={() => setShowLogin(true)}>Login/Sign Up </button>
          </li>
          <li></li>
          <p className="header-tag"> <span>Manage your Tasks efficiently</span> </p>
        </ul>

        <div className="login-modal" style={{display: showLogin ? "block" : "none"}}>Login/Sign Up
            <button className="close-modal" onClick={()=>setShowLogin(false)}>X</button>
            <div className="inputs-modal">
                <FaTimes />
                <input type="text" name="username" placeholder="Username"/>
                <input type="email" name="email" placeholder="Email address"/>
                <button>Sign Up/Login</button>
            </div>
        </div>

        <div className={"search-icon " + (isNavbarOpen ? "search-icon-open" : '')}>
          <FaSearch />
        </div>
        <div className={showLogin? 'search-icon' : ''}>
          <FaTimes />
        </div>
      </div>

      <div className="search-container" style={{display: showLogin ? "none" : "flex"}}>
        <div className="search-icon-search">
          <FaSearch />
        </div>
        <input type="text" name="" placeholder="Search..." />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;