import React from 'react';
import useClipboard from '../hooks/useClipboard';

const Task = ({ task }) => {
  // The useClipboard hook is expected to handle showing a toast confirmation.
  const { copy, copied } = useClipboard();

  return (
    <div className="task">
      <span>{task.text}</span>
      <button
        onClick={() => copy(task.text)}
        disabled={copied}
        className="copy-button"
        title="Copy task text"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default Task;