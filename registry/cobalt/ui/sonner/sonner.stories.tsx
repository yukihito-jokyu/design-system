import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import { Toaster } from "./sonner";
import { toast } from "sonner";
import { Button } from "@/registry/cobalt/ui/button/button";

const meta = {
  title: "Cobalt/UI/Sonner",
  component: Toaster,
  parameters: { designSystem: "cobalt" },
  argTypes: {
    motion: {
      description:
        "処理結果が積み上がる位置を自然に追えるようにする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: { motion: "inherit", closeButton: true },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => <Example {...args} /> };

function Example(args: React.ComponentProps<typeof Toaster>) {
  const id = useId();
  return (
    <>
      <div className="cobalt-filter-group">
        <Button onClick={() => toast.success("保存しました。", { toasterId: id })}>
          成功を通知
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error("保存できませんでした。", {
              toasterId: id,
              description: "時間をおいて再試行してください。",
            })
          }
        >
          失敗を通知
        </Button>
      </div>
      <Toaster {...args} id={id} />
    </>
  );
}

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
