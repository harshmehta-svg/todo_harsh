// src/Components/CodeView/CopyButton.js

/**
 * CopyButton Component
 *
 * @description A reusable component for handling copy functionality.
 */

import React from 'react';
import { Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';

function CopyButton({ text, onCopy }) {
  const copyHandler = () => {
    navigator.clipboard.writeText(text);
    onCopy();
  };

  return (
    <Button
      type="primary"
      icon={<i className="iconfont icon-copy"></i>}
      onClick={copyHandler}
    >
      Copied!
      <Tooltip title="Copy to clipboard">
        <Button type="link" size="small">
          Copy
        </Button>
      </Tooltip>
    </Button>
  );
}

export default CopyButton;