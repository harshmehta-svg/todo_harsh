// src/Utilities/Highlighter.js

import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import './Highlighter.css';

interface Props {
  data: string;
}

const Highlighter = ({ data }: Props) => {
  return (
    <div className="highlighter">
      <pre>
        <code
          className="language-json"
          suppressContentEditableWarning={true}
          data-clipboard-text={data}
        >
          {data}
        </code>
      </pre>
      <div className="copy-button">
        <button
          className="btn btn-sm"
          title="Copy to clipboard"
          onClick={() => {
            navigator.clipboard.writeText(data);
          }}
        >
          <i className="bi bi-clipboard"></i>
        </button>
      </div>
    </div>
  );
};

export default Highlighter;

// Adding HighlightJS to the page
function initHighlighter() {
  document.querySelectorAll('code').forEach((el) => {
    const language = el.getAttribute('language');
    if (language) {
      Prism.highlightElement(el, false);
    }
  });
}
initHighlighter();