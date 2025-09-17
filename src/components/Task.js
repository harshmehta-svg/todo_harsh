// @flow

// Libraries and modules
import React, { useState, useEffect } from 'react';
import './Task.css';

// Component definition
type Props = {
  taskId: string,
  taskName: string,
  taskDescription: string,
  onEdit: (taskId: string, taskName: string, taskDescription: string) => void,
  onDelete: (taskId: string) => void
};

const Task = ({
  taskId,
  taskName,
  taskDescription,
  onEdit,
  onDelete
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    if (edit) {
      setNewTaskName(taskName);
      setNewTaskDescription(taskDescription);
    }
  }, [edit, taskName, taskDescription]);

  const handleEdit = (newTaskName: string, newTaskDescription: string) => {
    onEdit(taskId, newTaskName, newTaskDescription);
    setEdit(false);
  };

  const handleDelete = () => {
    onDelete(taskId);
  };

  const handleEditToggle = () => {
    setEdit(!edit);
  };

  if (edit) {
    return (
      <div className="task">
        <h2>Editing task: {taskId}</h2>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Task name"
        />
        <textarea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task description"
        />
        <button onClick={() => handleEdit(newTaskName, newTaskDescription)}>Save changes</button>
        <button onClick={handleEditToggle}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="task">
      <h2>{taskName}</h2>
      <p>{taskDescription}</p>
      <button onClick={handleEditToggle}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;