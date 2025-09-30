import createEventEmitter from '../utils/event-emitter';

const emitter = createEventEmitter();

const initialState = {
  isOpen: false,
  content: null,
  options: {}
};

let state = { ...initialState };

const notify = () => emitter.emit(state);

export const subscribeToModal = (listener) => {
  listener(state);
  return emitter.subscribe(listener);
};

export const closeModal = () => {
  state = { ...initialState };
  notify();
};

export const openModal = (content, options = {}) => {
  const { onClose, ...rest } = options;

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
    closeModal();
  };

  state = {
    isOpen: true,
    content,
    options: {
      ...rest,
      onClose: handleClose
    }
  };

  notify();
};
