import React from 'react';
import CodeBlock from 'react-code-blocks';
import Prism from 'prismjs';
import copy from 'copy-to-clipboard';

const CodeViewer = ({ code }) => {
  const copyCode = () => {
    copy(code);
    console.log(`Code copied to clipboard: ${code}`);
  };

  return (
    <div className="code-viewer">
      <CodeBlock
        text={code}
        language="json"
        copyToClipboard={copyCode}
        showLineNumbers={false}
        wrapLines={true}
        theme={Prism.theme}
      />
      <button className="copy-button" onClick={copyCode}>
        Copy
      </button>
    </div>
  );
};

export default CodeViewer;