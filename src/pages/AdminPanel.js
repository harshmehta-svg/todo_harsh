import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Import CSS for styling

const AdminPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskData, setEditTaskData] = useState({ title: '', description: '', completed: false });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/todos'); // Assuming your backend route is /api/todos
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Please check your backend.');
      console.error('Error fetching tasks:', err);
    }
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setNewTask({ ...newTask, completed: e.target.checked });
  };

  const handleEditInputChange = (e) => {
    setEditTaskData({ ...editTaskData, [e.target.name]: e.target.value });
  };

  const handleEditCheckboxChange = (e) => {
    setEditTaskData({ ...editTaskData, completed: e.target.checked });
  };

  const createTask = async () => {
    try {
      if (!newTask.title || !newTask.description) {
        setError('Title and description are required.');
        return;
      }
      await axios.post('/api/todos', newTask);
      fetchTasks();
      setNewTask({ title: '', description: '', completed: false });
      setError('');
    } catch (err) {
      setError('Failed to create task.');
      console.error('Error creating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      fetchTasks();
      setError('');
    } catch (err) {
      setError('Failed to delete task.');
      console.error('Error deleting task:', err);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditTaskData({ title: task.title, description: task.description, completed: task.completed });
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const updateTask = async (id) => {
    try {
      if (!editTaskData.title || !editTaskData.description) {
        setError('Title and description are required.');
        return;
      }
      await axios.put(`/api/todos/${id}`, editTaskData);
      fetchTasks();
      setEditingTask(null);
      setError('');
    } catch (err) {
      setError('Failed to update task.');
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="admin-panel-container">
      <h1>Admin Panel</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="create-task-section">
        <h2>Create New Task</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <label>
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={newTask.completed}
            onChange={handleCheckboxChange}
          />
        </label>
        <button onClick={createTask}>Create Task</button>
      </div>

      <div className="task-list-section">
        <h2>Task List</h2>
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            {editingTask === task.id ? (
              <div className="edit-task-form">
                <input
                  type="text"
                  name="title"
                  value={editTaskData.title}
                  onChange={handleEditInputChange}
                />
                <textarea
                  name="description"
                  value={editTaskData.description}
                  onChange={handleEditInputChange}
                />
                <label>
                  Completed:
                  <input
                    type="checkbox"
                    name="completed"
                    checked={editTaskData.completed}
                    onChange={handleEditCheckboxChange}
                  />
                </label>
                <button onClick={() => updateTask(task.id)}>Update</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;