import { Meta, StoryObj } from "@storybook/react";
import InputText from "./InputText";

const meta: Meta<typeof InputText> = {
  title: "Components/InputText",
  component: InputText,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    label: "Name",
    value: "",
    placeholder: "Enter your name",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    value: "",
    placeholder: "Enter your email",
    error: "Invalid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    value: "",
    placeholder: "Enter your username",
    disabled: true,
  },
};
