import { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Notification from "./Notification";

const meta: Meta<typeof Notification> = {
  title: "Components/Notification",
  component: Notification,
  argTypes: {
    message: { control: "text" },
    type: { control: "radio", options: ["success", "error", "info"] },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
    },
    autoDismiss: { control: "boolean" },
    autoDismissTimeout: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const notificationRootRef = useRef<HTMLDivElement>(null);

    const showNotification = () => {
      setIsVisible(true);
    };

    const hideNotification = () => {
      setIsVisible(false);
    };

    return (
      <>
        <div ref={notificationRootRef} />
        <button onClick={showNotification}>Show Notification</button>
        {isVisible && notificationRootRef.current && (
          <Notification
            {...args}
            // @ts-ignore
            ref={notificationRootRef.current}
            onClose={hideNotification}
          />
        )}
      </>
    );
  },
  args: {
    message: "This is a notification!",
    type: "info",
    position: "top-right",
    autoDismiss: true,
    autoDismissTimeout: 3000,
  },
};
