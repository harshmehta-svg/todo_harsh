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
- Frontend: React, JavaScript
- Backend: None (local storage)
- Other: Webpack, Babel

## Project Structure
public/
  index.html
  app.js
src/
  components/
    TodoList.js
    Task.js
  scripts/
    script.js
  services/
    auth.js
package.json

## Features
- Add tasks
- Complete tasks
- Undo completed tasks
- Delete tasks
- Local storage persistence
- User login system
- Dark/light mode theme switcher

## Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Run `npm install` to install dependencies
4. Run `npm start` to start the application

## Configuration
- None

## Usage
1. Open the application in a web browser
2. Add tasks using the text input
3. Complete tasks by clicking the checkbox
4. Undo completed tasks by clicking the undo button
5. Delete tasks by clicking the delete button
6. Switch between dark and light mode using the theme switcher
7. Login or logout using the login system

## API Documentation
None

## Key Components
- TodoList
- Task
- Auth service

## Testing
- None

## Deployment
None

## Contributing
1. Fork the repository
2. Make changes to the code
3. Test the code
4. Push changes to the remote repository
5. Open a pull request

## License
[MIT License](https://github.com/username/todo-app/blob/main/LICENSE)