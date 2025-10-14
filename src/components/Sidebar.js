import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './Sidebar.css';

const Sidebar = ({ className }) => {
  const [collapsedSections, setCollapsedSections] = useState({});
  const [activeRoute, setActiveRoute] = useState('');

  const handleToggleCollapse = (sectionId) => {
    setCollapsedSections((prevCollapsedSections) => ({
      ...prevCollapsedSections,
      [sectionId]: !collapsedSections[sectionId],
    }));
  };

  const handleSetActiveRoute = (route) => {
    setActiveRoute(route);
  };

  const sidebarItems = [
    {
      id: uuid(),
      title: 'Home',
      route: '/',
      icon: 'home',
    },
    {
      id: uuid(),
      title: 'Features',
      route: '/features',
      icon: 'features',
    },
    {
      id: uuid(),
      title: 'About Us',
      route: '/about',
      icon: 'about',
    },
    {
      id: uuid(),
      title: 'Contact Us',
      route: '/contact',
      icon: 'contact',
    },
  ];

  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <ul className="sidebar-menu">
        {sidebarItems.map((item) => (
          <li key={item.id} className={activeRoute === item.route ? 'active' : ''}>
            <Link to={item.route} onClick={() => handleSetActiveRoute(item.route)}>
              <i className={`fa fa-${item.icon}`}></i> {item.title}
            </Link>
            <div className="accordion" onClick={() => handleToggleCollapse(item.id)}>
              {collapsedSections[item.id] || (
                <div>
                  <ul className="accordian-list">
                    {item.children ? (
                      item.children.map((child) => (
                        <li key={child.id}>
                          <Link to={child.route}>
                            <i className={`fa fa-${child.icon}`}></i> {child.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;