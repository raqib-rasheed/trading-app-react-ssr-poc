import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Modal from "./Modal";

describe("Modal Component", () => {
  test("renders modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Modal Content</p>
      </Modal>
    );
    const modalContent = screen.getByText(/Modal Content/i);
    expect(modalContent).not.toBeNull();
  });

  test("does not render modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Modal Content</p>
      </Modal>
    );
    const modalContent = screen.queryByText(/Modal Content/i);
    expect(modalContent).toBeNull();
  });

  test("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );
    const closeButton = screen.getByLabelText(/Close Modal/i);
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when escape key is pressed", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.keyDown(modalRootRef.current, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
