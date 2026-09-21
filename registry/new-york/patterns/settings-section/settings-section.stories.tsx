import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "../form-field/form-field";
import { Input } from "@/registry/new-york/ui/input/input";
import { SettingsSection } from "./settings-section";

const meta = {
  title: "Patterns/SettingsSection",
  component: SettingsSection,
  args: {
    title: "プロフィール",
    description: "表示名を変更できます。",
    children: <FormField label="表示名">{(binding) => <Input {...binding} />}</FormField>,
  },
} satisfies Meta<typeof SettingsSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
