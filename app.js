// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Load settings from localStorage
let settings = JSON.parse(localStorage.getItem('settings')) || {
    // Enable the use of localStorage to store todos
    useLocalStorage: true,
    // Disable the use of localStorage to retrieve todos on page load
    loadOnPageLoad: true,
};

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
        saveSettings();
        renderTodos();
    }
}

// Toggle completion status
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    saveSettings();
    renderTodos();
}

// Delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    saveSettings();
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

// Load settings from localStorage
function loadSettings() {
    settings = JSON.parse(localStorage.getItem('settings')) || {
        // Enable the use of localStorage to store todos
        useLocalStorage: true,
        // Disable the use of localStorage to retrieve todos on page load
        loadOnPageLoad: true,
    };
}

// Load todos from localStorage when loadOnPageLoad is set to true
if (settings.loadOnPageLoad) {
    getTodosFromServer().then((todosFromServer) => {
        todos = todosFromServer;
        saveSettings();
        renderTodos();
    }).catch((error) => {
        console.error('Error while loading todos:', error);
    });
}

// Simulate a server call to retrieve todos from an API
function getTodosFromServer() {
    return new Promise((resolve, reject) => {
        // Simulate a server response
        const todosFromServer = [
            { text: 'Todo 1', completed: false },
            { text: 'Todo 2', completed: true },
        ];
        resolve(todosFromServer);
    });
}

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
loadSettings();
renderTodos();