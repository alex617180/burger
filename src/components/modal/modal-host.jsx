import { useEffect, useState } from 'react';
import Modal from './modal.jsx';
import { closeModal, subscribeToModal } from '../../services/modal-service';

const defaultState = {
  isOpen: false,
  content: null,
  options: {}
};

export default function ModalHost() {
  const [modalState, setModalState] = useState(defaultState);

  useEffect(() => {
    const unsubscribe = subscribeToModal(setModalState);
    return unsubscribe;
  }, []);

  if (!modalState.isOpen || !modalState.content) {
    return null;
  }

  const { options, content } = modalState;
  const { onClose = closeModal, title } = options;

  const renderContent = typeof content === 'function' ? content : () => content;

  return (
    <Modal isOpen={modalState.isOpen} onClose={onClose} title={title}>
      {renderContent({ close: onClose })}
    </Modal>
  );
}
