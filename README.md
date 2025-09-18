# Todo App

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Key Components](#key-components)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview
This project is a Todo List application designed to help users manage their tasks. It features core functionalities such as adding, completing, undoing, and deleting tasks. The application persists all data in the browser's local storage, ensuring that the user's list is saved across sessions.

The repository contains a mix of implementations, including a vanilla JavaScript version and several components written in React. It also includes features like a simple user login system and a dark/light mode theme switcher.

## Technology Stack
- Node.js
- React
- JavaScript (vanilla)

## Project Structure
- public directory contains the static resources of the application
- src directory contains the source code of the application
  - components directory contains reusable UI components
  - styles directory contains CSS styles
  - scripts directory contains scripts and services
    - services directory contains authentication functionality

## Features
- Add task
- Complete task
- Undo task completion
- Delete task
- Simple user login system
- Dark/light mode theme switcher

## Prerequisites
- Node.js installation
- npm (Node Package Manager) installation

## Installation
1. Clone the repository to your local machine.
2. Run 'npm install' to install the dependencies.
3. Start the development server by running 'npm start'.

## Configuration
- Configure the project by modifying the 'package.json' file.

## Usage
- Open a web browser and navigate to 'http://localhost:3000'.
- Log in to the application with a valid username and password.
- Add tasks to the list by clicking the 'Add Task' button.
- Mark tasks as completed to remove them from the list.
- Undo completed tasks to reinstate them in the list.
- Delete tasks by clicking the 'Delete' button.

## API Documentation
The application's API documentation can be found in the 'src/scripts/services' directory.

## Key Components
- TodoList.js: A React component that displays the list of tasks.
- Task.js: A React component that represents a single task.
- auth.js: A script that handles user authentication.

## Testing
- Tests for the application can be found in the 'src/components' directory.

## Deployment
- The application can be deployed by building it with 'npm build' and then serving it with a web server.

## Contributing
- Contributions to the project are welcome. Please submit pull requests to the 'dev' branch.

## License
- The project is released under the MIT License.