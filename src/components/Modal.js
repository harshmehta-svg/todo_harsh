// src/components/Modal.js

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ children, onClose, onConfirm }) => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmModal = () => {
    setShowModal(false);
    onConfirm?.();
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ y: '-100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '-100vh' }}
            className="bg-white p-8 rounded shadow-lg w-full max-w-md"
            style={{
              overflow: 'visible',
              position: 'relative',
            }}
          >
            {children}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto"
              onClick={closeModal}
            >
              Close
            </button>
            {onConfirm && (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={confirmModal}
              >
                Confirm
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;