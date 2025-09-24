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
This repository contains a Todo List application with multiple, distinct implementations. The primary version is a client-side application built with vanilla HTML, CSS, and JavaScript that allows users to manage a list of tasks. This version persists data in the browser's local storage.

Additionally, the repository includes a separate, more advanced implementation using React. This React version features component-based architecture, state management with hooks, a hardcoded user authentication system, and a dark mode 

## Project Structure
- `public/`
  - `index.html`
  - `app.js`
- `src/`
  - `components/`
    - `TodoList.js`
    - `Task.js`
  - `styles/`
    - `styles.css`
  - `scripts/`
    - `script.js`
    - `services/`
      - `auth.js`
package.json

## Features
- Todo List management
- User authentication system (hardcoded)
- Dark mode support

## Prerequisites
- Node.js installed
- React installed

## Installation
1. Clone the repository
2. Run `npm install` in the terminal
3. Run `npm start` in the terminal

## Configuration
No configuration required

## Usage
1. Open `index.html` in a browser
2. Manage your Todo List

## API Documentation
No API

## Key Components
- `TodoList.js`: The main component for managing the Todo List
- `Task.js`: The component for individual tasks
- `styles.css`: The CSS file for styling the application
- `auth.js`: The hardcoded user authentication system

## Testing
No tests are implemented

## Deployment
No deployment instructions

## Contributing
 Contributions are welcome. Please submit a pull request with your changes.

## License
[MIT License](LICENSE)