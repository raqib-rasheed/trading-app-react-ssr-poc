import { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "close" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRootRef = useRef<HTMLDivElement>(null); // Correctly using useRef

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        {modalRootRef.current && (
          <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <h2>Modal Title</h2>
            <p>This is modal content.</p>
          </Modal>
        )}
      </>
    );
  },
  args: {
    isOpen: false,
  },
};
