// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const loginInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let user = JSON.parse(localStorage.getItem('user')) || null;

// Function to handle login form submission
function handleLogin() {
    const username = loginInput.value.trim();
    const password = passwordInput.value.trim();
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('user', JSON.stringify({username, password}));
        loginInput.value = '';
        passwordInput.value = '';
    }
}

// Function to handle logout
function handleLogout() {
    localStorage.removeItem('user');
    window.location.reload();
}

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
    if (text && user) {
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

if (user) {
    loginBtn.remove();
} else {
    loginBtn.addEventListener('click', handleLogin);
    todoInput.disabled = true;
    addBtn.disabled = true;
}

loginInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleLogin();
    }
});

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleLogin();
    }
});

// Add logout button
const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Logout';
logoutBtn.onclick = handleLogout;
document.body.appendChild(logoutBtn);

// Initial render
renderTodos();