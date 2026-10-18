import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { useState } from "react";
import { Button } from "../button/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";

const meta = {
  title: "Cobalt/UI/DropdownMenu",
  component: DropdownMenu,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "操作メニューの出どころと対象を伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof DropdownMenu>) {
  const [notify, setNotify] = useState(true);
  const [sort, setSort] = useState("newest");
  const [message, setMessage] = useState("操作を選んでください。");
  return (
    <div className="cobalt-stack">
      <DropdownMenu {...args}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" style={{ alignSelf: "flex-start" }}>
            記事の操作
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>記事の管理</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setMessage("編集を選びました。")}>
              編集<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>公開（準備中）</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={notify} onCheckedChange={setNotify}>
            更新を通知する
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>並び順</DropdownMenuSubTrigger>
            <DropdownMenuSubContent sideOffset={4}>
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">新しい順</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">古い順</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setMessage("削除はこの見本では実行しません。")}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="cobalt-note" role="status">
        {message} 通知：{notify ? "ON" : "OFF"}／{sort === "newest" ? "新しい順" : "古い順"}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Open: Story = { ...Default, args: { defaultOpen: true } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const MotionInteraction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "記事の操作" });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    const doc = canvasElement.ownerDocument;
    await waitFor(() =>
      expect(doc.querySelector('[data-slot="dropdown-menu-content"]')).toBeVisible(),
    );
    const popup = doc.querySelector<HTMLElement>('[data-slot="dropdown-menu-content"]')!;
    if (popup.dataset.cobaltMotion === "on") {
      await waitFor(() =>
        expect(
          popup
            .getAnimations()
            .some((animation) =>
              (animation.effect as KeyframeEffect)
                .getKeyframes()
                .some((frame) => parseFloat(String(frame.scale)) < 1),
            ),
        ).toBe(true),
      );
      await Promise.allSettled(popup.getAnimations().map((animation) => animation.finished));
    } else await expect(popup.getAnimations()).toHaveLength(0);
    await userEvent.keyboard("{Escape}");
    await expect(popup).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };
