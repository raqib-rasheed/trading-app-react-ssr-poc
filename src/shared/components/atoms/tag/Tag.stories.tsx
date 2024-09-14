import { Meta, StoryFn } from "@storybook/react";
import Tag, { ITagProps } from "./Tag";

export default {
  title: "Components/Tag",
  component: Tag,
} as Meta;

const Template: StoryFn<ITagProps> = (args) => <Tag {...args} />;

export const Success = Template.bind({});
Success.args = {
  children: "Success Tag",
  variant: "success",
};

export const Warn = Template.bind({});
Warn.args = {
  children: "Warn Tag",
  variant: "warn",
};

export const Error = Template.bind({});
Error.args = {
  children: "Error Tag",
  variant: "error",
};
