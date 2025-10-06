// New file
import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import NotificationBell from './NotificationBell.js';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filteredTasks: [],
      editMode: false,
      showDropdown: false,
      unreadCount: 0
    };
    this.add_TASK = this.add_TASK.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete_TASK = this.delete_TASK.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      this.setState({ tasks, filteredTasks: tasks });
    }
  }

  filterTasks(tasks, filter) {
    if (filter) {
      return tasks.filter(task => task.text.toLowerCase().includes(filter.toLowerCase()));
    } else {
      return tasks;
    }
  }

  add_TASK(text) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
      tasks = [];
    }
    localStorage.setItem('tasks', JSON.stringify([...tasks, { text, completed: false, id: this.state.tasks.length + 1 }]));
    this.setState({
      tasks: [...tasks, { text, completed: false, id: this.state.tasks.length + 1 }],
      filteredTasks: [...tasks, { text, completed: false, id: this.state.tasks.length + 1 }]
    });
  }

  toggleEdit(e) {
    this.setState({ editMode: !this.state.editMode });
  }

  handleChange(e) {
    if (this.state.editMode) {
      const id = e.target.dataset.id;
      const tasks = this.state.tasks.slice();
      const index = tasks.findIndex(task => task.id === parseInt(id));
      tasks[index].text = e.target.value;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.setState({ tasks });
    }
  }

  delete_TASK(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const filteredTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    this.setState({ tasks: filteredTasks, filteredTasks: filteredTasks });
  }

  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  markAllAsRead() {
    this.setState({ unreadCount: 0 });
  }

  render() {
    const { showDropdown, unreadCount } = this.state;

    return (
      <div className="todo-container">
        <h1 className="todo-title">Todo List</h1>
        <div className="todo-input">
          <input type="text" placeholder="Add new task" />
          <button onClick={() => this.add_TASK(document.querySelector('.todo-input input').value)}>Add task</button>
        </div>
        <div className="todo-filter">
          <input type="text" placeholder="Filter tasks" onChange={e => this.setState({ filteredTasks: this.filterTasks(this.state.tasks, e.target.value) })} />
        </div>
        <ul className="todo-list">
          {this.state.tasks.map(task => (
            <li key={task.id}>
              <button
                className={`check-button ${task.completed ? 'checked' : ''}`}
                onClick={() => {
                  const tasks = this.state.tasks.slice();
                  tasks.find(t => t.id === task.id).completed = !task.completed;
                  localStorage.setItem('tasks', JSON.stringify(tasks));
                  this.setState({ tasks });
                }}
              />{' '}
              <span className={`text ${task.completed ? 'done' : ''}`}>
                <input
                  type="text"
                  value={task.text}
                  disabled={task.completed || !this.state.editMode}
                  onChange={e => this.handleChange(e)}
                  data-id={task.id}
                />
              </span>{' '}
              <button
                className="delete-button"
                onClick={() => this.toggleEdit()}
                data-id={task.id}
              >Edit</button>{' '}
              <button
                className="delete-button"
                onClick={() => this.delete_TASK(task.id)}
              >Delete</button>{' '}
              <span
                className={`unread-badge ${task.read ? 'hidden' : ''}`}
              >!</span>
            </li>
          ))}
        </ul>
        <NotificationBell
          toggleDropdown={this.toggleDropdown}
          showDropdown={this.state.showDropdown}
          unreadCount={unreadCount}
        />
        <div className="unread-badge-container">
          <span className="unread-count">
            {unreadCount}
          </span>
          <button
            className="mark-all-read-button"
            onClick={() => this.markAllAsRead()}
          >Mark all as read</button>
        </div>
        <div>
          {showDropdown && (
            <div className="notification-dropdown">
              <h2 className="dropdown-title">Latest notifications</h2>
              <ul className="dropdown-list">
                {[
                  {
                    id: 1,
                    text: 'Task 1 was completed',
                    read: false
                  },
                  {
                    id: 2,
                    text: 'Task 2 was created',
                    read: true
                  },
                  {
                    id: 3,
                    text: 'Task 3 was deleted',
                    read: false
                  }
                ].map(notification => (
                  <li key={notification.id}>
                    <span
                      className={`dropdown-text ${notification.read ? 'read' : ''}`}
                    >
                      {notification.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  filteredTasks: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired
};

export default TodoList;