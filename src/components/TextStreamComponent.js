import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TextStreamComponent() {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const streamResponse = async () => {
      await axios.get('https://your-ai-agent-endpoint.com/stream-response')
        .then(response => {
          const chunks = response.data;
          const intervalId = setInterval(() => {
            if (text.length < chunks.length) {
              setText(text + chunks[text.length]);
              // Update the length of chunks when new response arrives from server
            } else {
              clearInterval(intervalId);
            }
          }, 100);
          return () => clearInterval(intervalId);
        })
        .catch(error => console.error(error));
    };
    streamResponse();
  }, []);

  // Use `useEffect` hook here when you're ready
  useEffect(() => {
    const typeWriter = async () => {
      let i = 0;
      let charLength = input.length;

      const intervalId = setInterval(() => {
        if (i < charLength) {
          // Add the new character to current text
          setText(text + input[i]);
          i += 1;
        } else {
          clearInterval(intervalId);
        }
      }, 200);
      return () => clearInterval(intervalId);
    };
    typeWriter();
  }, [input, text]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter text to stream"
      />
      <div className="text-stream">
        {text.split('').map((char, index) => (
          <span key={index} className="char">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TextStreamComponent;