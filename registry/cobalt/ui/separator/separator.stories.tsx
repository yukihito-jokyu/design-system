import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
  title: "Cobalt/UI/Separator",
  component: Separator,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", decorative: false },
  argTypes: {
    motion: {
      description:
        "情報の区切りを固定し、他の動きを邪魔しない。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="cobalt-stack" style={{ width: "100%", maxWidth: 480 }}>
      <p>無料相談について</p>
      <Separator {...args} />
      <p className="cobalt-note">ご希望の内容をお聞かせください。</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, height: 44 }}>
      <span>概要</span>
      <Separator {...args} />
      <span>利用方法</span>
    </div>
  ),
};

export const Decorative: Story = { ...Default, args: { decorative: true } };
