import React from 'react';

function Task() {
  return (
    <div>
      <h2>To-Do List</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Tasks will be rendered here */}
        </tbody>
      </table>
    </div>
  );
}

export default Task;