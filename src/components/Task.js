// src/components/Task.js

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDisclosure } from '@mui/base/AffordanceProvider';
import Typography from '@mui/material/Typography';

function Task({ taskProps }) {
  const theme = useTheme();
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <div
      style={{
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f0f0f0',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" component="h2">
        {taskProps.task}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onToggle}
        style={{
          fontSize: '14px',
          padding: '10px 20px',
          borderRadius: '5px',
          marginLeft: '10px',
        }}
      >
        {isOpen ? 'Hide Task' : 'Show Task'}
      </Button>
      {isOpen && <Typography variant="body1" component="p">{taskProps.description}</Typography>}
      <Button
        variant="contained"
        color="error"
        onClick={onClose}
        style={{
          fontSize: '14px',
          padding: '10px 20px',
          borderRadius: '5px',
          marginLeft: '10px',
        }}
      >
        Delete Task
      </Button>
    </div>
  );
}

export default Task;