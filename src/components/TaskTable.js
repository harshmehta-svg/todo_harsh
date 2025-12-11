import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleEdit = (task) => {
    onEdit(task);
  };

  const handleDelete = (taskId) => {
    onDelete(taskId);
  };

  if (!taskList || taskList.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {taskList.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>
              <button className="edit-button" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskTable;