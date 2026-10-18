import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId } from "react";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
  InputGroupText,
} from "./input-group";
import { Label } from "@/registry/cobalt/ui/label/label";

const meta = {
  title: "Cobalt/UI/InputGroup",
  component: InputGroup,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "入力と付属操作を一つのまとまりとして扱う。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof InputGroup>) {
  const id = useId();
  return (
    <div className="cobalt-field">
      <Label htmlFor={id}>記事を検索</Label>
      <InputGroup {...args}>
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput id={id} placeholder="キーワードを入力" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>⌘ K</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const WithAction: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput aria-label="ページURL" placeholder="https://example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          onClick={(event) =>
            event.currentTarget
              .closest('[role="group"]')
              ?.parentElement?.querySelector("input")
              ?.focus()
          }
        >
          編集
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Multiline: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="block-start">
        <InputGroupText>メモ</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea aria-label="メモ" placeholder="内容を入力してください" />
      <InputGroupAddon align="block-end">
        <InputGroupText>下書きとして保存されます</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput aria-label="タイトル" aria-invalid placeholder="タイトルは必須です" />
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput aria-label="タイトル" disabled value="変更できません" readOnly />
    </InputGroup>
  ),
};
