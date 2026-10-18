import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftNotice } from "./soft-notice";
import { Button } from "../../ui/button/button";

const meta = {
  title: "Cobalt/Character/SoftNotice",
  component: SoftNotice,
  parameters: { designSystem: "cobalt" },
  args: {
    title: "下書きは自動保存されます",
    children: "入力した内容は、この画面を開いている間に保存されます。",
    motion: "inherit",
  },
  argTypes: {
    tone: { control: "select", options: ["neutral", "success", "warning", "danger"] },
    motion: {
      description:
        "案内と成功を穏やかに伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof SoftNotice>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Success: Story = {
  args: { tone: "success", title: "変更を保存しました", children: "続けて編集できます。" },
};

export const Warning: Story = {
  args: {
    tone: "warning",
    title: "公開前に内容を確認してください",
    children: "公開すると、記事を閲覧できるようになります。",
  },
};

export const Danger: Story = {
  args: {
    tone: "danger",
    title: "保存できませんでした",
    children: "通信状態を確認して、再度お試しください。",
  },
};

export const WithAction: Story = {
  args: {
    action: (
      <Button asChild variant="outline">
        <a href="#notice-details">詳しく見る</a>
      </Button>
    ),
    children: <p id="notice-details">保存した下書きは、記事一覧から開くことができます。</p>,
  },
};

export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };
