import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingState } from "./loading-state";

const meta = {
  title: "Patterns/LoadingState",
  component: LoadingState,
  args: { loading: true, initial: true, children: <p>読み込みが完了しました。</p> },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Initial: Story = {};
export const Updating: Story = { args: { initial: false } };
export const Complete: Story = { args: { loading: false } };
