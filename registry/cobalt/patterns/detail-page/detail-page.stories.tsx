import { expect, userEvent, within, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/registry/cobalt/ui/button/button";
import { Input } from "@/registry/cobalt/ui/input/input";
import { DetailPage } from "./detail-page";
import { FormField } from "../form-field/form-field";
import { EditPage } from "../edit-page/edit-page";

const meta = {
  title: "Cobalt/Patterns/DetailPage",
  parameters: { designSystem: "cobalt" },
  component: DetailPage,
  argTypes: {
    motion: {
      description:
        "詳細を安定して読み、操作の結果を伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    title: "顧客詳細",
    back: (
      <Button asChild variant="link">
        <a href="#customer-list">顧客一覧に戻る</a>
      </Button>
    ),
    children: <p>顧客の詳細情報</p>,
  },
} satisfies Meta<typeof DetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof DetailPage>) {
  const editRef = useRef<HTMLButtonElement>(null);
  const wasEditing = useRef(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (wasEditing.current && !editing) editRef.current?.focus();
    wasEditing.current = editing;
  }, [editing]);
  if (editing)
    return (
      <EditPage
        motion={args.motion}
        title="顧客を編集"
        variant="edit"
        onSubmit={() => {
          setSaved(true);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      >
        <FormField label="名前">
          {(binding) => <Input {...binding} name="name" defaultValue="山田" required />}
        </FormField>
      </EditPage>
    );
  return (
    <div className="cobalt-stack">
      <DetailPage
        {...args}
        actions={
          <Button ref={editRef} onClick={() => setEditing(true)}>
            編集
          </Button>
        }
      />
      {saved && <p role="status">保存しました。</p>}
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const EmptyOrFailure: Story = { ...Default, args: { status: "missing" } };

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Forbidden: Story = { ...Default, args: { status: "forbidden" } };
export const Loading: Story = { ...Default, args: { status: "loading" } };

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

function DetailRetryExample(args: React.ComponentProps<typeof DetailPage>) {
  const [failed, setFailed] = useState(true);
  return (
    <DetailPage {...args} status={failed ? "error" : "ready"} onRetry={() => setFailed(false)} />
  );
}

export const Error: Story = {
  render: (args) => <DetailRetryExample {...args} />,
  args: { error: "詳細を読み込めませんでした。通信状態を確認してください。" },
};

export const LoadingMotionOff: Story = { ...Loading, args: { status: "loading", motion: "off" } };

export const Interaction: Story = {
  ...Default,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "編集" }));
    const input = canvas.getByRole("textbox", { name: "名前" });
    if (args.motion === "off") await expect(input).toHaveAttribute("data-cobalt-motion", "off");
    await userEvent.clear(input);
    await userEvent.type(input, "山田 太郎");
    await expect(input).toHaveValue("山田 太郎");
    await userEvent.click(canvas.getByRole("button", { name: "保存" }));
    await waitFor(() => expect(canvas.getByText("保存しました。")).toBeVisible());
    await waitFor(() => expect(canvas.getByRole("button", { name: "編集" })).toHaveFocus());
  },
};

export const InteractionMotionOff: Story = { ...Interaction, args: { motion: "off" } };
