import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckIcon } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "./avatar";

const meta = {
  title: "Cobalt/UI/Avatar",
  component: Avatar,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", size: "default" },
  argTypes: {
    motion: {
      description:
        "画像の読み込みによる急な切り替えを和らげる。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Avatar>) {
  return (
    <Avatar {...args} role="img" aria-label="山田 友紀">
      <AvatarFallback>YU</AvatarFallback>
    </Avatar>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Small: Story = { ...Default, args: { size: "sm" } };
export const Large: Story = { ...Default, args: { size: "lg" } };

export const Image: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcnのプロフィール画像" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
};

export const MotionOn: Story = { ...Image, args: { motion: "on" } };
export const MotionOff: Story = { ...Image, args: { motion: "off" } };

export const ImageFailure: Story = {
  render: (args) => (
    <Avatar {...args} role="img" aria-label="山田 友紀">
      <AvatarImage src="data:image/png;base64,invalid" alt="" />
      <AvatarFallback>YU</AvatarFallback>
    </Avatar>
  ),
};

export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args} role="img" aria-label="山田 友紀、確認済み">
      <AvatarFallback>YU</AvatarFallback>
      <AvatarBadge>
        <CheckIcon aria-hidden="true" />
      </AvatarBadge>
    </Avatar>
  ),
};

export const Group: Story = {
  render: (args) => (
    <AvatarGroup role="group" aria-label="参加者5名">
      <Example {...args} />
      <Avatar {...args} role="img" aria-label="佐藤 愛">
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <Avatar {...args} role="img" aria-label="高橋 健">
        <AvatarFallback>KT</AvatarFallback>
      </Avatar>
      <AvatarGroupCount role="img" aria-label="ほか2名">
        +2
      </AvatarGroupCount>
    </AvatarGroup>
  ),
};
