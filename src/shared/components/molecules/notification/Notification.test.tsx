import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Notification from "./Notification";
import { useRef } from "react";

describe("Notification Component", () => {
  test("renders the notification with the correct message and position", () => {
    const notificationRootRef = useRef<HTMLDivElement>(null);

    render(
      <Notification
        message="Test notification"
        type="info"
        position="top-right"
        onClose={vi.fn()}
        ref={notificationRootRef}
      />
    );

    const notification = screen.getByText(/Test notification/i);
    expect(notification).not.toBeNull();
    expect(notification.parentElement?.classList).toContain(
      "notification--top-right"
    );
  });

  test("calls onClose when the close button is clicked", () => {
    const notificationRootRef = useRef<HTMLDivElement>(null);
    const handleClose = vi.fn();

    render(
      <Notification
        message="Close button test"
        type="info"
        position="top-right"
        onClose={handleClose}
        ref={notificationRootRef}
      />
    );

    const closeButton = screen.getByLabelText(/Close Notification/i);
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("auto-dismisses the notification after the timeout", () => {
    const notificationRootRef = useRef<HTMLDivElement>(null);
    const handleClose = vi.fn();

    render(
      <Notification
        message="Auto-dismiss test"
        type="info"
        position="top-right"
        onClose={handleClose}
        autoDismiss={true}
        autoDismissTimeout={1000}
        ref={notificationRootRef}
      />
    );

    setTimeout(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    }, 1000);
  });
});
