import React, { useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TodoContext } from '../context/TodoContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { getTodos, addTodo, deleteTodo, updateTodo, undoCompleteTodo } from '../services/services';
import { Pagination } from '@mui/material';

const TodoList = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { darkMode, setDarkMode } = useDarkMode();

  const columns = [
    {
      field: 'text',
      headerName: 'Task',
      renderCell: (params) => <span style={{ textDecoration: params.row.completed ? 'line-through' : 'none' }}>{params.value}</span>,
      sortable: true
    },
    {
      field: 'completed',
      headerName: 'Completed',
      renderCell: (params) => <input type="checkbox" checked={params.value} onChange={() => updateTodo(params.row.id, { completed: !params.row.completed })} />,
      sortable: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <div>
          <button className="delete-todo" onClick={() => deleteTodo(params.row.id)}>Delete</button>
          {params.row.completed && <button className="undo-complete-todo" onClick={() => undoCompleteTodo(params.row.id)}>Undo</button>}
        </div>
      ),
      sortable: false
    }
  ];

  const handleAddTodo = () => {
    addTodo({ text: 'New Todo', completed: false })
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateTodoCompleted = (id) => {
    updateTodo(id, { completed: true })
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      })
      .catch((error) => console.error(error));
  };

  const handleUndoCompleteTodo = (id) => {
    updateTodo(id, { completed: false })
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePageChange = (newPage) => {
    const pageSize = 10;
    const offset = (newPage - 1) * pageSize;
    const filteredTodos = todos.slice(offset, offset + pageSize);
    setTodos(filteredTodos);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <h2>Todo List</h2>
      <button className="mode-switch" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <input
        type="text"
        placeholder="New Todo..."
        style={{ marginBottom: '1em' }}
      />
      <button className="add-todo" onClick={handleAddTodo}>
        Add Todo
      </button>
      <DataGrid
        rows={todos}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 30]}
        disableSelectionOnClick
      >
        <Pagination
          rowsPerPageOptions={[10, 20, 30]}
          count={Math.ceil(todos.length / 10)}
          page={Math.ceil(todos.length / 10)}
          onChangePage={handlePageChange}
        />
      </DataGrid>
    </div>
  );
};

export default TodoList;