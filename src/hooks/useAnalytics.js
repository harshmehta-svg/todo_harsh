// src/hooks/useAnalytics.js

import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { analyticsService } from '../services/analyticsService';

const useAnalytics = () => {
  const { user, company, region } = AuthContext.useContext();

  const [events, setEvents] = useState({});

  useEffect(() => {
    const handleEvent = (type, payload) => {
      const event = {
        type,
        payload,
        user,
        company,
        region,
        ...events,
      };

      analyticsService.sendEvent(event);
    };

    return handleEvent;
  }, [user, company, region]);

  return {
    trackEvent: (type, payload) => handleEvent(type, payload),
  };
};

export default useAnalytics;