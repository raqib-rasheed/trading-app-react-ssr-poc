import { KeyboardEventHandler, useRef } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const ref = useRef<HTMLElement>(null);

  let modal = null;

  if (ref.current && isOpen) {
    modal = ReactDOM.createPortal(
      <div
        className={clsx("modal__overlay", className)}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <div className="modal__content">
          <button
            className="modal__close-button"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
          {children}
        </div>
      </div>,
      ref.current
    );
  }

  return (
    <>
      <article ref={ref} />
      {modal}
    </>
  );
};

Modal.displayName = "Modal";

export default Modal;
