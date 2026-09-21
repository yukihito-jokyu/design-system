import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/registry/new-york/ui/dialog/dialog";
import { AssistantPanel } from "./assistant-panel";

const meta = {
  title: "Patterns/AssistantPanel",
  component: AssistantPanel,
  args: { title: "作業をお手伝いします", body: "次に行う操作を選んでください。" },
} satisfies Meta<typeof AssistantPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof AssistantPanel>) {
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);
  return (
    <>
      {closed ? (
        <p role="status">サポートを閉じました。</p>
      ) : (
        <AssistantPanel
          {...args}
          suggestions={[{ label: "内容を確認", onSelect: () => setOpen(true) }]}
          onClose={() => setClosed(true)}
        />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>内容を確認</DialogTitle>
          <DialogDescription>次の作業内容を確認します。</DialogDescription>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Thinking: Story = { ...Default, args: { status: "thinking" } };
