// @flow

import React, { useState } from 'react';
import './App.css';
import CodeViewer from './components/CodeViewer'; // import CodeViewer component

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [jsonResponse, setJsonResponse] = useState(''); // add json response state

  const handleLogin = (event:SyntheticEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginStatus(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginStatus(false);
  };

  const handleJsonButtonClick = () => {
    const jsonResponseData = {
      key: 'value',
      key1: 'value1',
      key2: 'value2',
    };
    setJsonResponse(JSON.stringify(jsonResponseData, null, 2)); // format json response
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn === true ? (
          <h2>
            Welcome, {username}! <button onClick={handleLogout}>Logout</button>
          </h2>
        ) : (
          loginStatus === false && (
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          )
        )}
        {isLoggedIn === true && (
          <button onClick={handleJsonButtonClick}>Get JSON Response</button>
        )}
      </header>
      {isLoggedIn === true && (
        <div className="json-response-container">
          <h3>JSON Response:</h3>
          <CodeViewer
            code={jsonResponse}
            language="json"
            copyText={jsonResponse}
          />
        </div>
      )}
    </div>
  );
}

export default App;

// NEW COMPONENT - CodeViewer.js
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactTooltip from 'react-tooltip'; // add react-tooltip for copy button

const CodeViewer = ({ code, language, copyText }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <SyntaxHighlighter
        language={language}
       style={docco}
        showLineNumbers={true}
        customStyle={{ backgroundColor: "#2f2f2f" }}
      >
        {code}
      </SyntaxHighlighter>
      <div className="copy-button-container">
        <button
          className={copied ? "copied" : ""}
          data-tip={copied ? "Copied!" : "Copy to clipboard"}
          onClick={handleCopy}
        >
          Copy
        </button>
        <ReactTooltip />
      </div>
    </div>
  );
}

export default CodeViewer;