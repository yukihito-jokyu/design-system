import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchField } from "./search-field";

function SearchExample() {
  const [value, setValue] = useState("");
  const [searched, setSearched] = useState("");
  return (
    <div className="stack">
      <SearchField value={value} onValueChange={setValue} onSearch={setSearched} />
      <p aria-live="polite">検索語: {searched || "未検索"}</p>
    </div>
  );
}

const meta = { title: "Patterns/SearchField", component: SearchExample } satisfies Meta<
  typeof SearchExample
>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
