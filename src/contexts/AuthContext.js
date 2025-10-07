// src/contexts/AuthContext.js

import React, { useState, useEffect } from 'react';
import { Cookies } from 'react-cookies';
import axios from 'axios';

// Import the cookie module
const cookie = new Cookies(document.cookie);

// Define global variables
const USER_STORAGE_KEY = 'user';
const COMPANY_STORAGE_KEY = 'company';
const REGION_STORAGE_KEY = 'region';

// Define the AuthContext
const AuthContext = React.createContext();

// Function to get user and company from local storage
const getUserAndCompanyFromStorage = () => {
  const storedUser = globalThis.localStorage.getItem(USER_STORAGE_KEY);
  const storedCompany = globalThis.localStorage.getItem(COMPANY_STORAGE_KEY);
  if (storedUser && storedCompany) {
    return { user: JSON.parse(storedUser), company: JSON.parse(storedCompany) };
  } else {
    return { user: null, company: null };
  }
};

// Function to update user, company, and region in local storage
const updateUserCompanyAndRegionInStorage = (user, company, region) => {
  globalThis.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  globalThis.localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(company));
  globalThis.localStorage.setItem(REGION_STORAGE_KEY, region);
};

// Define the AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserAndCompanyFromStorage().user || null);
  const [company, setCompany] = useState(getUserAndCompanyFromStorage().company || null);
  const [region, setRegion] = useState('');

  // Function to update user
  const updateCurrentUser = (updatedUser) => {
    setUser(updatedUser);
    updateUserCompanyAndRegionInStorage(updatedUser, company, region);
  };

  // Function to update company
  const updateCompany = (updatedCompany) => {
    setCompany(updatedCompany);
    updateUserCompanyAndRegionInStorage(user, updatedCompany, region);
  };

  // Function to update region
  const updateRegion = (newRegion) => {
    setRegion(newRegion);
    updateUserCompanyAndRegionInStorage(user, company, newRegion);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        region,
        updateUser: updateCurrentUser,
        updateCompany: updateCompany,
        updateRegion: updateRegion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Define the useAnalytics hook
const useAnalytics = () => {
  const { user, updateCurrentUser, updateCompany, updateRegion } = React.useContext(AuthContext);

  // Function to track event (e.g., user sign-up)
  const trackEvent = async (newUserData, companyData, region) => {
    try {
      console.log(`Tracking event: user sign-up with data ${newUserData}`);

      // Update user, company, and region in local storage and use the analytics API
      updateCurrentUser(newUserData.user);
      updateCompany(companyData);
      updateRegion(region);

      // You can now use the new analytics API to track the event in your backend
      axios.post('/api/analytics/track-event', {
        event: 'USER_SIGN_UP',
        eventData: newUserData,
        companyData,
        region,
      })
        .then((response) => {
          console.log('Event tracked successfully!');
        })
        .catch((error) => {
          console.error('Error tracking event:', error);
        });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return { trackEvent };
};

// Hook to get data from the context
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the AuthProvider and useAnalytics hook
export { AuthProvider, useAnalytics, useAuth };

export default AuthContext;