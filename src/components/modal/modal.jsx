import { createPortal } from "react-dom";
import ModalOverlay from "./modal-overlay";
import { useEffect, useRef } from "react";

export default function Modal({
    isOpen,
    onClose,
    title = "Модальное окно",
    children,
    modalFocusRef,
    className = "",
}){
    const cardRef = useRef(null);
    const closeBtnRef = useRef(null);

    // Закрытие на ESC
    useEffect(() => {
        if (!isOpen) return;
        const onKeyEsc = (event) => event.key === "Escape" && onClose?.();
        window.addEventListener('keydown', onKeyEsc);
        return () => window.removeEventListener('keydown', onKeyEsc);
    }, [isOpen, onClose])

    // Блокировка скролла Body
    useEffect(() => {
        if (!isOpen) return;
        const prevStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevStyle;
        };
    }, [isOpen])

    // Фокус при открытии модалки
    useEffect(() => {
        if (!isOpen) return;
        const target = modalFocusRef?.current || closeBtnRef?.current;
        target?.focus();
    }, [isOpen, modalFocusRef])

    return isOpen ? createPortal(
        <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        >
        {/* Overlay */}
        <ModalOverlay onClick={onClose} />

        {/* Card */}
        <div
            ref={cardRef}
            className={
            "relative z-10 w-full max-w-xl rounded-[32px] bg-[#1C1C28] text-neutral-100 shadow-[0_25px_80px_-35px_rgba(0,0,0,0.8)] ring-1 ring-white/10 animate-pop-up " +
            className
            }
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="flex items-start justify-between gap-4 px-10 pt-10">
                <h2 id="modal-title" className="text-3xl font-semibold tracking-[0.08em] uppercase text-white">
                    {title}
                </h2>
                <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    aria-label="Закрыть"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                    >
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="px-10 pb-10 pt-6">{children}</div>
        </div>
        </div>,
        document.body
    ) : null;
}
