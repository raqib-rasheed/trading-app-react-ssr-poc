import { useEffect, forwardRef, KeyboardEventHandler } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import "./Notification.scss";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  autoDismiss?: boolean;
  autoDismissTimeout?: number;
  onClose: () => void;
  ariaLabel?: string;
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      message,
      type = "info",
      position = "top-right",
      autoDismiss = true,
      autoDismissTimeout = 3000,
      onClose,
      ariaLabel = "Notification",
    },
    ref
  ) => {
    useEffect(() => {
      if (autoDismiss) {
        const timer = setTimeout(onClose, autoDismissTimeout);
        return () => clearTimeout(timer);
      }
    }, [autoDismiss, autoDismissTimeout, onClose]);

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (!ref || !(ref instanceof HTMLDivElement)) return null;

    return ReactDOM.createPortal(
      <div
        onKeyDown={handleKeyDown}
        className={clsx(
          "notification",
          `notification--${type}`,
          `notification--${position}`
        )}
        role="alert"
        aria-label={ariaLabel}
        aria-live="assertive"
        ref={ref}
      >
        <span>{message}</span>
        <button
          className={"notification__close-button"}
          onClick={onClose}
          aria-label="Close Notification"
        >
          &times;
        </button>
      </div>,
      ref
    );
  }
);

Notification.displayName = "Notification";

export default Notification;
