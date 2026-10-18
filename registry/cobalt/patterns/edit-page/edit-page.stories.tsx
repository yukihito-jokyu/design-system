import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditPage } from "./edit-page";
import { FormField } from "@/registry/cobalt/patterns/form-field/form-field";
import { Input } from "@/registry/cobalt/ui/input/input";

const meta = {
  title: "Cobalt/Patterns/EditPage",
  component: EditPage,
  parameters: { designSystem: "cobalt" },
  argTypes: {
    motion: {
      description:
        "保存を待つ間も操作の結果が分かるようにする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    title: "記事を編集",
    variant: "edit",
    onSubmit: (event) => event.preventDefault(),
    children: (
      <FormField label="タイトル" required>
        {(binding) => <Input {...binding} defaultValue="秋の新サービスを公開しました" />}
      </FormField>
    ),
  },
} satisfies Meta<typeof EditPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => <EditPage {...args} /> };
export const Submitting: Story = { ...Default, args: { submitting: true } };

export const Failure: Story = {
  ...Default,
  args: { error: "通信に失敗しました。再試行してください。" },
};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
