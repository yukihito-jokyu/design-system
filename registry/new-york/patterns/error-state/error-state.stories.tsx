import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorState } from "./error-state";

const meta = {
  title: "Patterns/ErrorState",
  component: ErrorState,
  args: {
    description: "ネットワークを確認して、もう一度お試しください。",
    onRetry: () => alert("再試行"),
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutRetry: Story = { args: { onRetry: undefined } };
