// src/services/AIAgentAPI.js

import axios from 'axios';
import { useState, useEffect } from 'react';

const endpoint = process.env.REACT_APP_AIAgentAPI_ENDPOINT;

const useAIAgent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!loading) {
        try {
          setLoading(true);
          const response = await axios.get(`${endpoint}/messages`);
          setMessages(response.data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [loading, endpoint]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${endpoint}/messages`, {
        text: input,
      });
      setMessages([...messages, response.data]);
      setInput('');
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    error,
    loading,
    handleSendMessage,
  };
};

export default useAIAgent;
