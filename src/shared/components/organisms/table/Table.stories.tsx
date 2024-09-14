import { Meta, StoryFn } from "@storybook/react";
import Table, { TableProps } from "./Table";

export default {
  title: "Components/Table",
  component: Table,
} as Meta;

interface IData {
  id: number;
  name: string;
  value: string;
}

const Template: StoryFn<TableProps<IData>> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    value: `Value ${index + 1}`,
  })),
  columns: [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "value", label: "Value" },
  ],
};
