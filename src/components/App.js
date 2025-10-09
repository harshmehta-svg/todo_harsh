// src/components/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [dialogue, setDialogue] = useState([]);
  const [response, setResponse] = useState(null);
  const [openAIKey, setOpenAIKey] = useState(process.env.REACT_APP_OPENAI_KEY);

  useEffect(() => {
    const scrollIntoView = () => {
      const element = document.getElementById('message');
      if (element != null) {
        element.scrollIntoView();
      }
    };
    scrollIntoView();
  }, [dialogue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      const message = {
        message: inputValue,
      };
      try {
        setDialogue((prevDialogue) => [...prevDialogue, { userMessage: true, message: inputValue }]);
        const data = await axios.post('https://api.openai.com/v1/engines/davinci-completions/generate',
          { prompt: inputValue, temperature: 0.5, max_tokens: 100 },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openAIKey}`,
            },
          }
        );
        setDialogue((prevDialogue) => [...prevDialogue, { aiResponse: true, response: data.data.choices[0].text.trim() }]);
        setResponse(data.data.choices[0].text.trim());
        setInputValue('');
      } catch (error) {
        console.error(error);
        setDialogue((prevDialogue) => [...prevDialogue, { aiResponse: false, response: 'No response received.' }]);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatBot App</h1>
      </header>
      <div className="chat-container">
        <div className="chat-sidebar">
          {dialogue.map((message, index) => (
            <div key={index} id={message.userMessage ? 'user-message' : 'ai-response'} className="message">
              {message.aiResponse ? (
                <span className="message-text text-left">{message.response}</span>
              ) : (
                <span className="message-text text-right">{message.message}</span>
              )}
            </div>
          ))}
        </div>
        <div className="chat-main">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="input-field"
          />
          <button className="send-btn" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;