import { expect, userEvent, within, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/registry/cobalt/ui/dialog/dialog";
import { Button } from "@/registry/cobalt/ui/button/button";
import { AssistantPanel } from "./assistant-panel";

const meta = {
  title: "Cobalt/Patterns/AssistantPanel",
  parameters: { designSystem: "cobalt" },
  component: AssistantPanel,
  argTypes: {
    motion: {
      description:
        "案内を親しみやすく取り出す。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    title: "作業をお手伝いします",
    body: "次に行う操作を選んでください。",
  },
} satisfies Meta<typeof AssistantPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof AssistantPanel>) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);
  return (
    <div className="cobalt-stack">
      {closed ? (
        <div className="cobalt-stack">
          <p role="status">サポートを閉じました。</p>
          <div className="cobalt-actions">
            <Button autoFocus variant="outline" onClick={() => setClosed(false)}>
              サポートを開く
            </Button>
          </div>
        </div>
      ) : (
        <AssistantPanel
          {...args}
          suggestions={[
            {
              label: "内容を確認",
              onSelect: () => {
                triggerRef.current = document.activeElement as HTMLElement;
                setOpen(true);
              },
            },
          ]}
          onClose={() => setClosed(true)}
        />
      )}
      <Dialog motion={args.motion} open={open} onOpenChange={setOpen}>
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <DialogTitle>内容を確認</DialogTitle>
          <DialogDescription>次の作業内容を確認します。</DialogDescription>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Thinking: Story = { ...Default, args: { status: "thinking" } };

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Saved: Story = { ...Default, args: { status: "saved" } };
export const WithoutClose: Story = {};

export const Interaction: Story = {
  ...Default,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    if (args.motion === "off")
      for (const element of canvasElement.querySelectorAll("[data-cobalt-motion]"))
        await expect(element).toHaveAttribute("data-cobalt-motion", "off");
    await userEvent.click(canvas.getByRole("button", { name: "内容を確認" }));
    await waitFor(() => expect(body.getByRole("dialog", { name: "内容を確認" })).toBeVisible());
    if (args.motion === "off")
      await expect(body.getByRole("dialog")).toHaveAttribute("data-cobalt-motion", "off");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.getByRole("button", { name: "内容を確認" })).toHaveFocus());
    await userEvent.click(canvas.getByRole("button", { name: "サポートを閉じる" }));
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "サポートを開く" })).toHaveFocus(),
    );
    await userEvent.click(canvas.getByRole("button", { name: "サポートを開く" }));
    await waitFor(() => expect(canvas.getByRole("button", { name: "内容を確認" })).toBeVisible());
    await userEvent.click(canvas.getByRole("button", { name: "サポートを閉じる" }));
  },
};

export const InteractionMotionOff: Story = { ...Interaction, args: { motion: "off" } };
