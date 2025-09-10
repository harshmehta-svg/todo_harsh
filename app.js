// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const loginInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const loginBtn = document.getElementById('login-form-submission');
const logoutBtn = document.getElementById('logout-btn');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')) || false;

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

// Handle login form submission
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === 'test@example.com' && password === 'password') {
        isAuthenticated = true;
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        renderLogin();
    } else {
        console.error('Invalid email or password.')

        // Show error message
        document.getElementById('login-form-submission-error').classList.remove('hide');
        setTimeout(() => {
            document.getElementById('login-form-submission-error').classList.add('hide');
        }, 3000);
    }
});

// Show login form or todo list based on authentication status
function renderLogin() {
    if (isAuthenticated) {
        todoList.classList.remove('hide');
        todoInput.focus();
        addBtn.disabled = false;
    } else {
        todoList.classList.add('hide');
        todoInput.value = '';
        todoInput.placeholder = 'Login to add todos';
        todoList.innerHTML = '';
        addBtn.disabled = true;
    }
}

// Load todos and render after DOM has been loaded
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
    renderLogin();

    // Event listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isAuthenticated) {
            renderLogin();
        }
    });

    // Logout listener
    logoutBtn.addEventListener('click', () => {
        isAuthenticated = false;
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        renderLogin();

        // Clear todos
        todos = [];
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    });
});