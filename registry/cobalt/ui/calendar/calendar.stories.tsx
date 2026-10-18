import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";

const meta = {
  title: "Cobalt/UI/Calendar",
  component: Calendar,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", defaultMonth: new Date(2026, 9, 1), today: new Date(2026, 9, 17) },
  argTypes: {
    motion: {
      description:
        "選んだ日を軽く強調し、範囲の帯は安定させる。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Calendar>) {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 17));
  return <Calendar {...args} mode="single" selected={date} onSelect={setDate} />;
}

function RangeExample({
  initialRange = { from: new Date(2026, 9, 12), to: new Date(2026, 9, 16) },
  ...args
}: React.ComponentProps<typeof Calendar> & { initialRange?: DateRange }) {
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  return <Calendar {...args} mode="range" selected={range} onSelect={setRange} />;
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Range: Story = { render: (args) => <RangeExample {...args} /> };

export const CrossWeekRange: Story = {
  render: (args) => (
    <RangeExample
      {...args}
      initialRange={{ from: new Date(2026, 9, 9), to: new Date(2026, 9, 20) }}
    />
  ),
};

export const SingleDayRange: Story = {
  render: (args) => (
    <RangeExample
      {...args}
      initialRange={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 12) }}
    />
  ),
};

export const RangeMotionOff: Story = { ...Range, args: { motion: "off" } };

export const Dropdowns: Story = {
  ...Default,
  args: { captionLayout: "dropdown", startMonth: new Date(2025, 0), endMonth: new Date(2027, 11) },
};

export const Disabled: Story = { ...Default, args: { disabled: true } };
export const WeekNumbers: Story = { ...Default, args: { showWeekNumber: true } };
