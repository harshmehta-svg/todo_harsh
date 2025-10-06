// src/utils/analytics.ts

// Import necessary libraries and interfaces
import { useEffect, useState } from 'react';
import { analytics } from '../services/analytics';
import { User } from '../types/user';

// UseAnalytics hook implementation
const useAnalytics = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data from API or local storage
    // For demo purposes, assume we have a static user object
    const userInfo: User = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      region: 'US',
      company: 'Example Inc.',
    };

    // Set the initial user state
    setUser(userInfo);

    // Set global context in analytics instance
    analytics.identify(userInfo.id, userInfo);

    // Register event listeners for common events
    window.addEventListener('click', () => {
      analytics.track('Click', { user: userInfo });
    });

    window.addEventListener('scroll', () => {
      analytics.track('Scroll', { user: userInfo });
    });

    return () => {
      window.removeEventListener('click', () => {
        analytics.track('Click', { user: userInfo });
      });

      window.removeEventListener('scroll', () => {
        analytics.track('Scroll', { user: userInfo });
      });
    };
  }, []);

  // Provide a function to track events
  const trackEvent = (eventName: string, properties: object = {}) => {
    analytics.track(eventName, { user: user!, ...properties });
  };

  return { user, trackEvent };
};

// Export the useAnalytics hook
export default useAnalytics;