import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SettingsPage } from "./settings-page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/new-york/ui/alert-dialog/alert-dialog";

const meta = {
  title: "Patterns/SettingsPage",
  component: SettingsPage,
  args: {
    title: "設定",
    groups: [
      {
        id: "notice",
        title: "通知",
        content: (
          <label>
            通知を受け取る <input type="checkbox" />
          </label>
        ),
        onSave: () => {},
      },
    ],
  },
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function Example() {
      const [saved, setSaved] = useState(false);
      return (
        <SettingsPage
          {...args}
          groups={args.groups.map((group) => ({ ...group, saved, onSave: () => setSaved(true) }))}
        />
      );
    }

    return <Example />;
  },
};

export const EmptyOrFailure: Story = {
  args: {
    groups: [
      {
        id: "notice",
        title: "通知",
        content: <p>通知設定</p>,
        onSave: () => {},
        error: "保存できませんでした",
      },
    ],
  },
};

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Saving: Story = {
  args: {
    groups: [
      { id: "notice", title: "通知", content: <p>通知設定</p>, onSave: () => {}, saving: true },
    ],
  },
};

export const Saved: Story = {
  args: {
    groups: [
      { id: "notice", title: "通知", content: <p>通知設定</p>, onSave: () => {}, saved: true },
    ],
  },
};

export const Dangerous: Story = {
  render: (args) => {
    function Example() {
      const [open, setOpen] = useState(false);
      const [reset, setReset] = useState(false);
      return (
        <>
          <SettingsPage
            {...args}
            groups={[
              { id: "notice", title: "通知", content: <p>通知設定</p>, onSave: () => {} },
              {
                id: "reset",
                title: "設定を初期化",
                description: "保存した設定を削除します。",
                content: (
                  <p>{reset ? "設定を初期化しました。" : "操作の影響を確認してください。"}</p>
                ),
                actionLabel: "初期化",
                busyLabel: "初期化中…",
                onSave: () => setOpen(true),
                dangerous: true,
              },
            ]}
          />
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>設定を初期化しますか？</AlertDialogTitle>
                <AlertDialogDescription>保存した設定が削除されます。</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={() => setReset(true)}>
                  初期化
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    }

    return <Example />;
  },
};
