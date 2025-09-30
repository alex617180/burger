const createEventEmitter = () => {
  const listeners = new Set();

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    emit(payload) {
      listeners.forEach((listener) => listener(payload));
    },
    clear() {
      listeners.clear();
    }
  };
};

export default createEventEmitter;
