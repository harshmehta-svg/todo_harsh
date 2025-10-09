// src/components/CodeAssistant.js

import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import axios from 'axios';

function CodeAssistant() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const sendPromptToAPI = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/codeassistant', { prompt });
      setGeneratedCode(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>CodeAssistant</h2>
      <textarea
        className="form-control"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your code prompt here..."
      />
      <button className="btn btn-primary" onClick={sendPromptToAPI}>
        Send Prompt
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <pre>
              <code
                className="language-javascript"
                dangerouslySetInnerHTML={{ __html: generatedCode }}
              />
            </code>
          )}
        </div>
      )}
    </div>
  );
}

export default CodeAssistant;