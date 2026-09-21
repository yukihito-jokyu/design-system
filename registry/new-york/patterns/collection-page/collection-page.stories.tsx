import type { Meta, StoryObj } from "@storybook/react-vite";
import { CollectionPage } from "./collection-page";

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
  args: { rows: [], empty: <p>顧客がいません。作成してください。</p> },
};

export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
export const Loading: Story = { args: { loading: true } };
