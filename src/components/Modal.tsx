import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Modal.module.css';

interface Props {
  children: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}

const Modal: React.FC<Props> = ({ children, onClose, onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    onClose?.();
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm?.();
  };

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            y: -10,
            scale: 0.9,
            transition: {
              duration: 0.3,
            },
          }}
          className={styles.modalWrapper}
        >
          <div className={styles.modalContent}>
            {children}
            <button className={styles.modalButton} onClick={handleCloseModal}>
              Cancel
            </button>
            {onConfirm && (
              <button className={styles.modalButton} onClick={handleConfirm}>
                Confirm
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;