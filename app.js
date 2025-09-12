// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// List of files to be deleted from root level
const filesToDelete = ['styles.css', 'index.html', 'index.css', 'app.js'];

// Function to check if a file exists at the root level
function isFileAtRootLevel(fileName) {
  return require('path').basename(fileName) === fileName;
}

// Delete files from root level
const fs = require('fs');
const path = require('path');
filesToDelete.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath) && isFileAtRootLevel(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${file}`);
  }
});

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos to the page
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        if (todo.completed) {
            span.classList.add('completed');
        }

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleComplete(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(index);

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Add a new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

// Toggle completion status
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
renderTodos();