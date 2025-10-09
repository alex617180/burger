
export default function ModalOverlay({ onClick }){
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={onClick}
            aria-hidden="true"
            data-testid="modal-overlay"
        />
    )
}