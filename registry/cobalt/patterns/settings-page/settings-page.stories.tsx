import { expect, userEvent, within, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { Switch } from "@/registry/cobalt/ui/switch/switch";
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
} from "@/registry/cobalt/ui/alert-dialog/alert-dialog";

const meta = {
  title: "Cobalt/Patterns/SettingsPage",
  parameters: { designSystem: "cobalt" },
  component: SettingsPage,
  argTypes: {
    motion: {
      description:
        "保存が終わったことを穏やかに祝う。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    title: "設定",
    groups: [
      {
        id: "notice",
        title: "通知",
        content: (
          <label className="cobalt-choice">
            <Switch defaultChecked />
            通知を受け取る
          </label>
        ),
        onSave: () => {},
      },
    ],
  },
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function SettingsPageExample(args: React.ComponentProps<typeof SettingsPage>) {
  const [states, setStates] = useState<Record<string, "saving" | "saved">>({});
  return (
    <SettingsPage
      {...args}
      groups={args.groups.map((group) => ({
        ...group,
        saving: states[group.id] === "saving" || group.saving,
        saved: states[group.id] === "saved" || group.saved,
        error: states[group.id] ? undefined : group.error,
        onSave: () => {
          setStates((current) => ({ ...current, [group.id]: "saving" }));
          setTimeout(() => setStates((current) => ({ ...current, [group.id]: "saved" })), 500);
        },
      }))}
    />
  );
}

export const Default: Story = {
  render: (args) => <SettingsPageExample {...args} />,
};

export const EmptyOrFailure: Story = {
  ...Default,
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

function DangerousSettingsExample(args: React.ComponentProps<typeof SettingsPage>) {
  const triggerRef = useRef<HTMLElement | null>(null);
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
            content: <p>{reset ? "設定を初期化しました。" : "操作の影響を確認してください。"}</p>,
            actionLabel: "初期化",
            busyLabel: "初期化中…",
            onSave: () => {
              triggerRef.current = document.activeElement as HTMLElement;
              setOpen(true);
            },
            dangerous: true,
          },
        ]}
      />
      <AlertDialog motion={args.motion} open={open} onOpenChange={setOpen}>
        <AlertDialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (triggerRef.current?.isConnected) triggerRef.current.focus();
          }}
        >
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

export const Dangerous: Story = {
  render: (args) => <DangerousSettingsExample {...args} />,
};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const DangerousMotionOff: Story = { ...Dangerous, args: { motion: "off" } };

export const Interaction: Story = {
  ...Default,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name: "通知を受け取る" });
    if (args.motion === "off") await expect(toggle).toHaveAttribute("data-cobalt-motion", "off");
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
    await userEvent.click(canvas.getByRole("button", { name: "保存" }));
    await expect(toggle).toBeDisabled();
    await expect(canvas.getByRole("button", { name: "保存中…" })).toBeDisabled();
    await waitFor(() => expect(canvas.getByText("保存しました。")).toBeVisible());
    await expect(toggle).toBeEnabled();
    await expect(toggle).not.toBeChecked();
  },
};

export const InteractionMotionOff: Story = { ...Interaction, args: { motion: "off" } };

export const DangerousInteraction: Story = {
  ...Dangerous,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByRole("button", { name: "初期化" }));
    const dialog = within(body.getByRole("alertdialog"));
    await waitFor(() => expect(dialog.getByRole("button", { name: "キャンセル" })).toHaveFocus());
    await userEvent.click(dialog.getByRole("button", { name: "キャンセル" }));
    await waitFor(() => expect(canvas.getByRole("button", { name: "初期化" })).toHaveFocus());
    await userEvent.click(canvas.getByRole("button", { name: "初期化" }));
    await userEvent.click(
      within(body.getByRole("alertdialog")).getByRole("button", { name: "初期化" }),
    );
    await waitFor(() => expect(canvas.getByText("設定を初期化しました。")).toBeVisible());
  },
};
