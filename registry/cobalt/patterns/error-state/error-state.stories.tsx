import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorState } from "./error-state";

const meta = {
  title: "Cobalt/Patterns/ErrorState",
  component: ErrorState,
  parameters: { designSystem: "cobalt" },
  argTypes: {
    motion: {
      description:
        "エラーを落ち着いて読めるようにする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    description: "記事を読み込めませんでした。時間をおいて再試行してください。",
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const MotionOn: Story = { ...Default, args: { motion: "on", onRetry: () => {} } };
export const MotionOff: Story = { ...MotionOn, args: { ...MotionOn.args, motion: "off" } };
