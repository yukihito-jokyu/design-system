import type { Meta, StoryObj } from "@storybook/react-vite";
import { CharacterIcon, FeatureIcon, StatusBubble, directions } from "./index";

const meta = {
  title: "Cobalt/Character/CharacterIcons",
  component: CharacterIcon,
  parameters: { designSystem: "cobalt" },
  args: { direction: "fold", expression: "welcome", size: 48, label: "ようこそ" },
  argTypes: {
    direction: { control: "select", options: directions },
    expression: { control: "select", options: ["welcome", "thinking", "success"] },
    size: { control: { type: "number", min: 12, max: 512 } },
  },
} satisfies Meta<typeof CharacterIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Thinking: Story = { args: { expression: "thinking", label: "考え中" } };
export const Success: Story = { args: { expression: "success", label: "完了" } };

export const Document: Story = {
  render: ({ direction }) => <FeatureIcon direction={direction} name="document" label="文書" />,
};

export const Idea: Story = {
  render: ({ direction }) => <FeatureIcon direction={direction} name="idea" label="アイデア" />,
};

export const History: Story = {
  render: ({ direction }) => <FeatureIcon direction={direction} name="history" label="履歴" />,
};

export const StatusThinking: Story = {
  render: ({ direction }) => <StatusBubble direction={direction} status="thinking" announce />,
};

export const StatusSaved: Story = {
  render: ({ direction }) => <StatusBubble direction={direction} status="saved" announce />,
};

export const CustomStatus: Story = {
  render: ({ direction }) => (
    <StatusBubble direction={direction} status="saved">
      下書きを保存しました
    </StatusBubble>
  ),
};
