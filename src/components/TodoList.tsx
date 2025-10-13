// @ts-check
import React from 'react';
import { useState } from 'react';
import { Button } from './Task.js';
import { motion } from 'framer-motion';
import { Modal } from './Modal';

const TodoList = () => {
  const [visibility, setVisibility] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '' });

  const openModal = (title, message) => {
    setVisibility(true);
    setModalData({ title, message });
  };

  const closeModal = () => {
    setVisibility(false);
  };

  const modalConfirm = () => {
    setVisibility(false);
    // Implement confirm action here
  };

  return (
    <div>
      <h1>Todo List</h1>
      <Button onClick={() => openModal('Todo List', 'Are you sure you want to delete?')}>Delete Todo Item</Button>

      <modalData.title>
        Are you sure you want to delete?
      </modalData.title>

      {visibility && (
        <Modal onClose={closeModal} onConfirm={modalConfirm}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {modalData.message}
          </motion.p>

          <motion.button
            className="confirm-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={modalConfirm}
          >
            Confirm
          </motion.button>
          <button
            className="cancel-button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
};

export default TodoList;