// New file
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { json } from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { solarizedDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';

SyntaxHighlighter.registerLanguage('json', json);

const CodeView = ({ response }) => {
  const copyJson = () => {
    axios.post('/api/log', response);
  };

  return (
    <div className="code-view">
      <CopyToClipboard text={response} onCopy={() => copyJson()}>
        <button className="copy-btn">Copy JSON</button>
      </CopyToClipboard>
      <SyntaxHighlighter
        language="json"
        style={solarizedDark}
        showLineNumbers={true}
        wrapLongLines={true}
      >
        {response && JSON.stringify(response, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeView;