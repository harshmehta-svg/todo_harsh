import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { json } from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import CopyToClipboard from 'react-copy-to-clipboard';

SyntaxHighlighter.registerLanguage('json', json);

const JSONFormatter = ({ jsonString }) => {
  const copyData = (event) => {
    navigator.clipboard.writeText(jsonString);
  };

  return (
    <div>
      <CopyToClipboard text={jsonString}>
        <button className="btn btn-sm btn-primary" onClick={copyData}>
          Copy to clipboard
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language="json" showLineNumbers={true}>
        {jsonString}
      </SyntaxHighlighter>
    </div>
  );
};

export default JSONFormatter;