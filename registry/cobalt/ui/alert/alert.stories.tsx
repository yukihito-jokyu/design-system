import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "Cobalt/UI/Alert",
  component: Alert,
  parameters: { designSystem: "cobalt" },
  args: {
    motion: "inherit",
    variant: "default",
    children: (
      <>
        <AlertTitle>記事の公開について</AlertTitle>
        <AlertDescription>公開前に内容を確認してください。</AlertDescription>
      </>
    ),
  },
  argTypes: {
    motion: {
      description:
        "成功の到達を軽く祝う。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
    variant: { control: "select", options: ["default", "success", "warning", "destructive"] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Failure: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <AlertTitle>読み込めませんでした</AlertTitle>
        <AlertDescription>時間をおいて再試行してください。</AlertDescription>
      </>
    ),
  },
};

export const MotionOn: Story = {
  args: {
    motion: "on",
    variant: "success",
    children: (
      <>
        <AlertTitle>記事を公開しました</AlertTitle>
        <AlertDescription>公開した内容を確認できます。</AlertDescription>
      </>
    ),
  },
};

export const MotionOff: Story = { ...MotionOn, args: { ...MotionOn.args, motion: "off" } };
