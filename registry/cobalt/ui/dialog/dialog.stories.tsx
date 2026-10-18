import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./dialog";
import { Button } from "@/registry/cobalt/ui/button/button";
import { Input } from "@/registry/cobalt/ui/input/input";
import { Checkbox } from "@/registry/cobalt/ui/checkbox/checkbox";
import { FormField } from "@/registry/cobalt/patterns/form-field/form-field";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { ThemeProvider } from "@/registry/cobalt/components/theme-provider/theme-provider";
import type { MotionPreference } from "@/registry/cobalt/components/theme-provider/motion-provider";

const meta = {
  title: "Cobalt/UI/Dialog",
  component: Dialog,
  parameters: { designSystem: "cobalt" },
  argTypes: {
    motion: {
      description:
        "重要な作業へ視線を集める。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: { motion: "inherit" },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>編集を開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>プロフィールを編集</DialogTitle>
          <DialogDescription>表示するお名前を変更できます。</DialogDescription>
        </DialogHeader>
        <FormField label="お名前">
          {(binding) => <Input {...binding} defaultValue="山田 太郎" />}
        </FormField>
        <DialogFooter>
          <DialogClose asChild>
            <Button>完了</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Open: Story = { ...Default, args: { defaultOpen: true } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const MotionInteraction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "編集を開く" });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    const dialog = body.getByRole("dialog");
    const animations = dialog.getAnimations();
    if (dialog.dataset.cobaltMotion === "on") {
      await expect(
        animations.some((animation) =>
          (animation.effect as KeyframeEffect)
            .getKeyframes()
            .some((frame) => frame.scale === "0.96"),
        ),
      ).toBe(true);
      await Promise.allSettled(animations.map((animation) => animation.finished));
    } else await expect(animations).toHaveLength(0);
    await expect(within(dialog).getByRole("textbox", { name: "お名前" })).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };

function MotionExample() {
  const [global, setGlobal] = useState<"on" | "off">("on");
  const [local, setLocal] = useState<MotionPreference>("inherit");
  return (
    <ThemeProvider motion={global} tokens={{ "--cobalt-verification": "inherited" }}>
      <Dialog motion={local} defaultOpen>
        <DialogTrigger asChild>
          <Button>動きの設定を開く</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>動きの設定</DialogTitle>
            <DialogDescription>全体とこのDialogの設定を切り替えられます。</DialogDescription>
          </DialogHeader>
          <FormField label="全体の動き">
            {(binding) => (
              <select
                {...binding}
                className="cobalt-input"
                value={global}
                onChange={(event) => setGlobal(event.target.value as "on" | "off")}
              >
                <option value="on">ON</option>
                <option value="off">OFF</option>
              </select>
            )}
          </FormField>
          <FormField label="このDialogの動き">
            {(binding) => (
              <select
                {...binding}
                className="cobalt-input"
                value={local}
                onChange={(event) => setLocal(event.target.value as MotionPreference)}
              >
                <option value="inherit">全体から継承</option>
                <option value="on">ON</option>
                <option value="off">OFF</option>
              </select>
            )}
          </FormField>
          <FormField label="お名前">
            {(binding) => <Input {...binding} defaultValue="山田 太郎" />}
          </FormField>
          <Checkbox aria-label="更新を受け取る" />
          <DialogFooter>
            <DialogClose asChild>
              <Button>完了</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export const MotionPriority: Story = {
  render: () => <MotionExample />,
  // OS設定の通知を再現し、他のStoryへ変更を残さない。
  // 実際のOS設定やCSSのメディアクエリーを変更するテストではない。
  beforeEach: () => {
    const original = window.matchMedia;
    const reducedQuery = "(prefers-reduced-motion: reduce)";
    const query = original.call(window, reducedQuery);
    Object.defineProperty(query, "matches", { configurable: true, value: false });
    window.matchMedia = (value) => (value === reducedQuery ? query : original.call(window, value));
    return () => {
      window.matchMedia = original;
    };
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(body.getByRole("dialog")).toBeVisible());
    const dialog = body.getByRole("dialog");
    const content = within(dialog);
    const global = content.getByRole("combobox", { name: "全体の動き" });
    const local = content.getByRole("combobox", { name: "このDialogの動き" });
    const input = content.getByRole("textbox", { name: "お名前" });
    const complete = content.getByRole("button", { name: "完了" });
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      for (const reduced of [false, true]) {
        Object.defineProperty(query, "matches", { configurable: true, value: reduced });
        query.dispatchEvent(new Event("change"));
        for (const parent of ["on", "off"] as const) {
          await userEvent.selectOptions(global, parent);
          for (const child of ["inherit", "on", "off"] as const) {
            await userEvent.selectOptions(local, child);
            const expected = reduced ? "off" : child === "inherit" ? parent : child;
            for (const element of [
              dialog,
              input,
              complete,
              canvasElement.ownerDocument.querySelector(".cobalt-dialog-overlay")!,
            ]) {
              await waitFor(() => expect(element).toHaveAttribute("data-cobalt-motion", expected));
              if (expected === "off") {
                await expect(
                  getComputedStyle(element)
                    .transitionDuration.split(",")
                    .every((duration) => parseFloat(duration) === 0),
                ).toBe(true);
                await expect(element.getAnimations()).toHaveLength(0);
              }
              await expect(element).not.toHaveAttribute("motion");
            }
            await expect(
              getComputedStyle(dialog).getPropertyValue("--cobalt-verification").trim(),
            ).toBe("inherited");
            await expect(input).toHaveValue("山田 太郎");
          }
        }
      }
    } finally {
      Object.defineProperty(query, "matches", { configurable: true, value: false });
      query.dispatchEvent(new Event("change"));
    }
    await userEvent.selectOptions(global, "on");
    await userEvent.selectOptions(local, "inherit");
    // ONへ戻しても、開いていた内容に登場アニメーションを再発生させない。
    await expect(dialog.getAnimations()).toHaveLength(0);
    const checkbox = content.getByRole("checkbox", { name: "更新を受け取る" });
    await userEvent.click(checkbox);
    await expect(checkbox.getAnimations({ subtree: true }).length).toBeGreaterThan(0);
    // 再生途中のOFFで描画を止める。ONに戻してもチェック状態から再生し直さない。
    await userEvent.selectOptions(local, "off");
    await expect(checkbox).toBeChecked();
    await waitFor(() => expect(checkbox).toHaveAttribute("data-cobalt-motion", "off"));
    // CSSの切替を計算してから、進行中のtransitionも停止したことを確認する。
    await expect(getComputedStyle(checkbox).transitionDuration).toBe("0s");
    await expect(checkbox.getAnimations({ subtree: true })).toHaveLength(0);
    await userEvent.selectOptions(local, "on");
    await expect(checkbox.getAnimations({ subtree: true })).toHaveLength(0);
    await userEvent.clear(input);
    await userEvent.type(input, "設定を変更しても入力できます");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
    const trigger = within(canvasElement).getByRole("button", { name: "動きの設定を開く" });
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(body.getByRole("dialog")).toBeVisible());
    const reopened = within(body.getByRole("dialog")).getByRole("textbox", { name: "お名前" });
    await userEvent.clear(reopened);
    await userEvent.type(reopened, "12通りの設定を確認しました");
    await expect(reopened).toHaveValue("12通りの設定を確認しました");
  },
};
