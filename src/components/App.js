import React from "react";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import apiService from "./services/apiService/apiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.getToken();
  }

  getToken() {
    // Fetch token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ token });
      this.fetchTasks();
    }
  }

  fetchTasks() {
    apiService
      .getTasks()
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addTask(task) {
    apiService
      .createTask(task)
      .then(response => {
        const newTasks = [...this.state.tasks, response.data];
        this.setState({ tasks: newTasks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateTask(task) {
    apiService
      .updateTask(task)
      .then(response => {
        const updatedTasks = this.state.tasks.map(t => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        });
        this.setState({ tasks: updatedTasks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteTask(taskId) {
    apiService
      .deleteTask(taskId)
      .then(() => {
        const updatedTasks = this.state.tasks.filter(t => t.id !== taskId);
        this.setState({ tasks: updatedTasks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <AddTask addTask={task => this.addTask(task)} />
        <TaskList
          tasks={this.state.tasks}
          updateTask={task => this.updateTask(task)}
          deleteTask={taskId => this.deleteTask(taskId)}
        />
      </div>
    );
  }
}

export default App;