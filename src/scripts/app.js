// New file

// Modified imports for new file locations
import todos from '../todos/app.js';
import './styles.css';

// Existing code remains the same
console.log(todos);

// Note: This JavaScript file will run in a browser environment, 
// so you can use the document object as you normally would.
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
});

// Export statement remains unchanged
export default todos;