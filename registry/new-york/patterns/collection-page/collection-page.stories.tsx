import type { Meta, StoryObj } from "@storybook/react-vite";
import { CollectionPage } from "./collection-page";
import { Button } from "@/registry/new-york/ui/button/button";
import { useState } from "react";

const meta = {
  title: "Patterns/CollectionPage",
  component: CollectionPage,
  args: {
    title: "顧客",
    rows: [{ id: "1", name: "山田" }],
    columns: [
      {
        id: "name",
        header: "名前",
        value: (row: unknown) => (row as { id: string; name: string }).name,
      },
    ],
    getRowId: (row: unknown) => (row as { id: string; name: string }).id,
    caption: "顧客一覧",
    onSelectionChange: () => {},
  },
} satisfies Meta<typeof CollectionPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const EmptyOrFailure: Story = {
  args: { rows: [] },
  render: (args) => {
    function Example() {
      const [creating, setCreating] = useState(false);

      return (
        <>
          <CollectionPage
            {...args}
            emptyAction={<Button onClick={() => setCreating(true)}>顧客を作成</Button>}
          />
          {creating && <p role="status">顧客の作成を開始します。</p>}
        </>
      );
    }

    return <Example />;
  },
};

export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
export const Loading: Story = { args: { loading: true } };
