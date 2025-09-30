import { createPortal } from 'react-dom';
import { useEffect, useId } from 'react';
import PropTypes from 'prop-types';

const MODAL_ROOT_ID = 'react-modals';

export default function Modal({ isOpen, onClose, title, children }) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const container = document.getElementById(MODAL_ROOT_ID);

  if (!container) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onMouseDown={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className="relative min-w-[320px] max-w-lg rounded-lg bg-white p-6 shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {title && (
          <h2 id={titleId} className="mb-4 text-xl font-semibold">
            {title}
          </h2>
        )}
        <button
          type="button"
          className="absolute right-4 top-4 text-gray-500 transition hover:text-gray-700"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          <span aria-hidden="true">X</span>
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>,
    container
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node
};

Modal.defaultProps = {
  isOpen: false,
  onClose: undefined,
  title: undefined,
  children: null
};
