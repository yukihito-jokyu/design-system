import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ErrorState } from "./error-state";

const meta = {
  title: "Patterns/ErrorState",
  component: ErrorState,
  args: { description: "ネットワークを確認して、もう一度お試しください。" },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function Example() {
      const [retried, setRetried] = useState(false);
      return retried ? (
        <p role="status">再試行しました。</p>
      ) : (
        <ErrorState {...args} onRetry={() => setRetried(true)} />
      );
    }

    return <Example />;
  },
};

export const WithoutRetry: Story = { args: { onRetry: undefined } };
