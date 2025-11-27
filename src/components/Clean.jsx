import React, { useState, useEffect } from 'react';
import { fetchApiData } from '../api';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ items }) => {
  return (
    <aside className="lg:w-1/4 xl:w-1/5 p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Sidebar</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.href} className="block py-2 hover:bg-gray-200">
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const MainContent = ({ children }) => {
  return (
    <main className="lg:w-3/4 xl:w-4/5 p-4">
      {children}
    </main>
  );
};

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchApiData();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-200" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      <Sidebar items={[
        { href: '/home', text: 'Home' },
        { href: '/about', text: 'About' },
        { href: '/contact', text: 'Contact' },
      ]} />
      <MainContent>
        {children}
      </MainContent>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;