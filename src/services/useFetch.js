// src/services/useFetch.js

import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the cache object to store the fetched data
const cache = {};

// Define the useFetch hook
const useFetch = (url) => {
  // Initialize state variables to track the data, loading, and error states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the data is already cached
  if (cache[url]) {
    // If the data is cached, initialize state variables with the cached data
    setData(cache[url].data);
    setLoading(cache[url].loading);
    setError(cache[url].error);
  }

  // useEffect hook to fetch data from the URL when the component mounts or the URL changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the data is already cached before making the fetch request
        if (cache[url]) {
          // If the data is cached, skip the fetch request and update the state variables
          setLoading(false);
          return;
        }

        // Make the fetch request using the axios library
        const response = await axios.get(url);

        // Cache the fetched data
        cache[url] = {
          data: response.data,
          loading: false,
          error: null,
        };

        // Update the state variables with the fetched data
        setData(response.data);
        setLoading(false);
      } catch (error) {
        // Update the state variable with the error message
        setError(error.message);
      } finally {
        // Regardless of whether an error occurred or not, set the loading state to false
        setLoading(false);
      }
    };

    // Call the fetchData function to start the fetch process
    fetchData();
  }, [url]);

  // Return the data, loading, and error states
  return { data, loading, error };
};

// Export the useFetch hook
export default useFetch;