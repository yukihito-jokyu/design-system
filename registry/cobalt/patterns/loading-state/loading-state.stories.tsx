import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingState } from "./loading-state";

const meta = {
  title: "Cobalt/Patterns/LoadingState",
  component: LoadingState,
  parameters: { designSystem: "cobalt" },
  args: {
    loading: true,
    initial: true,
    motion: "inherit",
    children: <p>記事を読み込みました。</p>,
  },
  argTypes: {
    motion: {
      description:
        "待機と読める状態への変化を伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Loaded: Story = { args: { loading: false } };
export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };
