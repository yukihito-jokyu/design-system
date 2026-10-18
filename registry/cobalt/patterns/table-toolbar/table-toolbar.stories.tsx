import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TableToolbar } from "./table-toolbar";

const meta = {
  title: "Cobalt/Patterns/TableToolbar",
  component: TableToolbar,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", query: "", onQueryChange: () => {}, count: 5 },
  argTypes: {
    motion: {
      description:
        "検索・絞り込み操作を軽く返す。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
    query: { control: false },
    onQueryChange: { control: false },
  },
} satisfies Meta<typeof TableToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof TableToolbar>) {
  const [query, setQuery] = useState("");
  return <TableToolbar {...args} query={query} onQueryChange={setQuery} />;
}

export const Default: Story = { render: (args) => <Example {...args} /> };

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
