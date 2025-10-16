// src/hooks/useFetch.js

/**
 * @file UseFetch hook for data fetching
 * @author  [Your Name]
 * @date    [Current Date]
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * @hook useFetch
 * @param {string} url API endpoint URL
 * @param {object[]} options axios instance configuration
 * @returns {object} data, loading, error states
 */

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios({
          ...options,
          url,
        });
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;