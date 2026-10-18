import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Input } from "@/registry/cobalt/ui/input/input";

const meta = {
  title: "Cobalt/UI/Label",
  component: Label,
  parameters: { designSystem: "cobalt" },
  args: {},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="cobalt-field">
      <Label {...args} htmlFor="label-example">
        お名前
      </Label>
      <Input id="label-example" placeholder="お名前を入力してください" />
    </div>
  ),
};
