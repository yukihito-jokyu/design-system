import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { useId } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxValue,
  ComboboxChipsInput,
  useComboboxAnchor,
} from "./combobox";
import { Label } from "@/registry/cobalt/ui/label/label";

const meta = {
  title: "Cobalt/UI/Combobox",
  component: Combobox,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "入力と候補のつながりを伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;
const categories = ["お知らせ", "ご利用ガイド", "導入事例", "アップデート"];

function Example(args: React.ComponentProps<typeof Combobox>) {
  const id = useId();
  return (
    <div className="cobalt-field">
      <Label htmlFor={id}>カテゴリー</Label>
      <Combobox {...args} items={categories}>
        <ComboboxInput id={id} placeholder="カテゴリーを検索" showClear />
        <ComboboxContent>
          <ComboboxEmpty>候補がありません。</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

function MultipleExample(args: React.ComponentProps<typeof Combobox>) {
  const anchor = useComboboxAnchor();
  return (
    <Combobox
      motion={args.motion}
      disabled={args.disabled}
      items={categories}
      multiple
      defaultValue={[categories[0]]}
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: string[]) =>
            values.map((value) => <ComboboxChip key={value}>{value}</ComboboxChip>)
          }
        </ComboboxValue>
        <ComboboxChipsInput aria-label="カテゴリーを追加" placeholder="カテゴリーを追加" />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>候補がありません。</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Multiple: Story = { render: (args) => <MultipleExample {...args} /> };
export const Disabled: Story = { ...Default, args: { disabled: true } };

export const MotionInteraction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "カテゴリー" });
    await userEvent.click(await canvas.findByRole("button", { name: "候補を開く" }));
    const body = within(canvasElement.ownerDocument.body);

    const popup = (await body.findByRole("listbox")).closest<HTMLElement>(
      ".cobalt-combobox-content",
    )!;

    if (popup.dataset.cobaltMotion === "on") {
      // Base UIが初期位置を確定し、data-starting-styleを外した後の再生を確認する。
      await waitFor(() =>
        expect(
          popup
            .getAnimations()
            .some((animation) =>
              (animation.effect as KeyframeEffect).getKeyframes().some((frame) => "scale" in frame),
            ),
        ).toBe(true),
      );
      await Promise.allSettled(popup.getAnimations().map((animation) => animation.finished));
    } else await expect(popup.getAnimations()).toHaveLength(0);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(input).toHaveValue("お知らせ");
    await expect(input).toHaveFocus();
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };
