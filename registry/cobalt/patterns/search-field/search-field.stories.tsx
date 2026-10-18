import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SearchField } from "./search-field";
import { expect, fireEvent, userEvent, within } from "storybook/test";

const meta = {
  title: "Cobalt/Patterns/SearchField",
  component: SearchField,
  parameters: { designSystem: "cobalt" },
  args: { value: "", onValueChange: () => {}, motion: "inherit" },
  argTypes: {
    value: { control: false },
    onValueChange: { control: false },
    motion: {
      description:
        "入力と検索解除に即時反応する。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof SearchField>) {
  const [value, setValue] = useState(args.value);
  const [result, setResult] = useState("");
  return (
    <div className="cobalt-stack">
      <SearchField
        {...args}
        value={value}
        onValueChange={setValue}
        onSearch={(query) => setResult(`「${query}」で検索しました。`)}
      />
      <p className="cobalt-note" role="status">
        {result}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Interaction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "検索" });
    await userEvent.type(input, "研修");
    // 日本語の変換確定に使うEnterでは検索を実行しない。
    await fireEvent.compositionStart(input);
    await fireEvent.keyDown(input, { key: "Enter", isComposing: true });
    await expect(canvas.getByRole("status")).toBeEmptyDOMElement();
    await fireEvent.compositionEnd(input);
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByRole("status")).toHaveTextContent("「研修」で検索しました。");
    await userEvent.click(canvas.getByRole("button", { name: "検索をクリア" }));
    await expect(input).toHaveValue("");
    await expect(input).toHaveFocus();
    await expect(canvas.getByRole("button", { name: "検索をクリア" })).toBeDisabled();
  },
};

export const InteractionMotionOff: Story = { ...Interaction, args: { motion: "off" } };
