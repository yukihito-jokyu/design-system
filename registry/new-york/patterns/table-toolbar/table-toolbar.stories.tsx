import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableToolbar } from "./table-toolbar";

function ToolbarExample() {
  const [query, setQuery] = useState("");
  return (
    <TableToolbar query={query} onQueryChange={setQuery} count={query ? 1 : 6}>
      <span>担当者</span>
    </TableToolbar>
  );
}

const meta = { title: "Patterns/TableToolbar", component: ToolbarExample } satisfies Meta<
  typeof ToolbarExample
>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
