import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsPage } from "./settings-page";

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
        onSave: () => alert("保存"),
      },
    ],
  },
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

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

export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };

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
  args: {
    groups: [
      { id: "notice", title: "通知", content: <p>通知設定</p>, onSave: () => {} },
      {
        id: "reset",
        title: "設定を初期化",
        description: "保存した設定を削除します。",
        content: <p>操作の影響を確認してください。</p>,
        onSave: () => alert("確認が必要です"),
        dangerous: true,
      },
    ],
  },
};
