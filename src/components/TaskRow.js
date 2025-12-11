import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskRow = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask({ ...task }); // Reset to original task data
  };

  const handleSaveClick = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  if (isEditing) {
    return (
      <tr>
        <td>
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="dueDate"
            value={editedTask.dueDate || ''} // Handle potential undefined dueDate
            onChange={handleInputChange}
          />
        </td>
        <td>
          <select
            name="status"
            value={editedTask.status}
            onChange={handleInputChange}
          >
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </td>
        <td>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{task.description}</td>
      <td>{task.dueDate}</td>
      <td>{task.status}</td>
      <td>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </td>
    </tr>
  );
};

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskRow;