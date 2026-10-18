import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MessageBubble } from "./message-bubble";

const meta = {
  title: "Cobalt/Character/MessageBubble",
  component: MessageBubble,
  parameters: { designSystem: "cobalt" },
  args: {
    author: "アシスタント",
    time: "2026-10-17T10:00:00+09:00",
    children: "記事の下書きをまとめました。内容を確認して、必要に応じて編集できます。",
    motion: "inherit",
  },
  argTypes: {
    status: { control: "select", options: ["sending", "sent", "error"] },
    motion: {
      description:
        "届いた・送れたことをやさしく伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Sending: Story = { args: { status: "sending" } };

function RetryExample(args: React.ComponentProps<typeof MessageBubble>) {
  const [retried, setRetried] = useState(false);
  return (
    <MessageBubble {...args} status={retried ? "sent" : "error"} onRetry={() => setRetried(true)} />
  );
}

export const Error: Story = { render: (args) => <RetryExample {...args} /> };
export const MotionOn: Story = { ...Error, args: { motion: "on" } };
export const MotionOff: Story = { ...Error, args: { motion: "off" } };
