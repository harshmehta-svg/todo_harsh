// src/components/Task.js

import React from 'react';

/**
 * Task component displays a single task in a Doremon-like design.
 * It receives a task object as a prop and displays its title and progress.
 */

const Task = ({ title }) => {
  return (
    /**
     * Doremon design: blue background with a yellow light at the top.
     * Title is displayed at the center and in a bold font.
     * Progress bar is displayed below the title and in green.
     */
    <div className="task doremon-task">
      <div className="light"></div>
      <div className="title">{title}</div>
      <div className="progress-bar"></div>
    </div>
  );
};

export default Task;