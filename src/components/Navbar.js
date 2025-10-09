import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton, Offcanvas } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.scss';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});

  // Get user data from local storage or API (for demonstration purposes)
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleNavbarToggle = () => {
    setShow(!show);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a
          className="navbar-brand"
          href="/"
          style={{
            textDecoration: 'none',
            color: '#000',
            fontSize: '1.2rem',
            fontWeight: '500',
          }}
        >
          Todo App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle Navigation"
          onClick={handleNavbarToggle}
        >
          <FaBars className="me-2" size={20} />
        </button>
        <div className="dropdowns">
          <DropdownButton
            id="navbar-profile-dropdown"
            menuAlign="right"
            title={userData.name || 'Profile'}
            className="dropdown me-2 me-lg-0"
          >
            <Dropdown.Item href={`/profile/${userData.id}`}>
              View Profile
            </Dropdown.Item>
            <Dropdown.Item href="#logout">
              Logout
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className={`dropdowns hide-on-mobile ${show ? 'show' : ''}`}>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Close Navigation"
            onClick={() => setShow(false)}
          >
            <FaTimes className="me-2" size={20} />
          </button>
          <ul className="nav-link-list">
            <li>
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="me-4 me-lg-5"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                exact
                activeClassName="active"
                className="me-4 me-lg-5"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                exact
                activeClassName="active"
                className="me-4 me-lg-5"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                exact
                activeClassName="active"
                className="me-4 me-lg-5"
              >
                Settings
              </NavLink>
            </li>
          </ul>
          <ul className="nav-logo-list hide-on-mobile">
            <li>
              <NavLink
                to="/"
                exact
                activeClassName="active"
                className="me-4 me-lg-5"
              >
                <img
                  src="logo.png"
                  alt="Logo"
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                  }}
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userData: PropTypes.object,
};

export default Navbar;