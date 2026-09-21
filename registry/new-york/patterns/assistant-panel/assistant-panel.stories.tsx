import type { Meta, StoryObj } from "@storybook/react-vite";
import { AssistantPanel } from "./assistant-panel";

const meta = {
  title: "Patterns/AssistantPanel",
  component: AssistantPanel,
  args: {
    title: "作業をお手伝いします",
    body: "次に行う操作を選んでください。",
    suggestions: [{ label: "内容を確認", onSelect: () => alert("内容を確認") }],
    onClose: () => alert("閉じる"),
  },
} satisfies Meta<typeof AssistantPanel>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Thinking: Story = { args: { status: "thinking" } };
