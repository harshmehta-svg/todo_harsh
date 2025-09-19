// Importing necessary libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Existing code should remain unchanged
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      newTask: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }

  handleChange(event) {
    this.setState({ newTask: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      text: this.state.newTask,
      complete: false,
    };
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      newTask: '',
    }));
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  handleComplete(id) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      ),
    }));
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  handleDelete(id) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  handleUndo(id) {
    const incompleteTasks = this.state.tasks.filter((task) => !task.complete);
    const taskToUndo = incompleteTasks[incompleteTasks.length - 1];
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? (taskToUndo ? { ...task, complete: false } : task) : task
      ),
    }));
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTask}
            onChange={this.handleChange}
            placeholder="Enter new task"
          />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {this.state.tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.complete}
                onChange={() => this.handleComplete(task.id)}
              />
              <span
                style={{
                  textDecoration: task.complete ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </span>
              <button onClick={() => this.handleDelete(task.id)}>Delete</button>
              <button onClick={() => this.handleUndo(task.id)}>Undo</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// Node.js file system scripts and unnecessary scripts that should be removed
// const fs = require('fs');
// fs.readFile('file.txt', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data.toString());
// });