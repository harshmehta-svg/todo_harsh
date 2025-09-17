// src/TodoList.js

import React from 'react';
import './TodoList.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  tasks: Task[];
  onComplete: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onComplete, onDelete }) => {
  const handleCheckboxClick = (task: Task) => {
    onComplete(task);
  };

  const handleDeleteClick = (task: Task) => {
    onDelete(task);
  };

  return (
    <div className="todo-list">
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxClick(task)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => handleDeleteClick(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;