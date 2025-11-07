// src/hooks/useAIResponse.js

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAIResponse = (apiEndpoint, apiKey) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendQuery = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const params = {
          model: 'text-curie-001',
          max_tokens: 128,
          temperature: 0.7,
          top_p: 1,
          n besten: 1,
        };

        const aiResponse = await axios.post(apiEndpoint, {
          prompt: query,
          api_key: apiKey,
          params,
        });

        setResponse(aiResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    sendQuery();
  }, [query, apiEndpoint, apiKey]);

  const handlesetQuery = (newQuery) => {
    setQuery(newQuery);
  };

  return {
    query,
    response,
    loading,
    error,
    setQuery: handlesetQuery,
  };
};