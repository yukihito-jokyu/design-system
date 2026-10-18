import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeader } from "./page-header";
import { Button } from "@/registry/cobalt/ui/button/button";

const meta = {
  title: "Cobalt/Patterns/PageHeader",
  component: PageHeader,
  parameters: { designSystem: "cobalt" },
  argTypes: {
    motion: {
      description:
        "ページの名前と操作を見失わせない。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    title: "記事一覧",
    description: "記事を探して、公開状況を確認できます。",
    headingLevel: 1,
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const MotionOn: Story = {
  ...Default,
  args: { motion: "on", actions: <Button>記事を作成</Button> },
};

export const MotionOff: Story = { ...MotionOn, args: { ...MotionOn.args, motion: "off" } };
