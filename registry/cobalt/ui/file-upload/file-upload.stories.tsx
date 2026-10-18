import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { FileUpload } from "./file-upload";

const meta = {
  title: "Cobalt/UI/FileUpload",
  component: FileUpload,
  parameters: { designSystem: "cobalt" },
  args: {
    label: "添付ファイル",
    accept: ".txt,.png,.pdf",
    multiple: true,
    maxSize: 1024 * 1024,
    motion: "inherit",
    onUpload: () => new Promise<void>((resolve) => setTimeout(resolve, 600)),
  },
  argTypes: {
    motion: {
      description:
        "追加したファイルを見つけやすくする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof FileUpload>) {
  return <FileUpload {...args} />;
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

function RetryExample(args: React.ComponentProps<typeof FileUpload>) {
  const attempts = useRef(0);
  return (
    <FileUpload
      {...args}
      onUpload={() =>
        new Promise<void>((resolve, reject) => {
          attempts.current += 1;
          const first = attempts.current === 1;
          setTimeout(() => (first ? reject(new Error("送信失敗")) : resolve()), 600);
        })
      }
    />
  );
}

export const Failure: Story = {
  render: (args) => <RetryExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "初回だけ送信に失敗し、選択したファイルを再試行で送信できます。外部への通信は行いません。",
      },
    },
  },
};

export const Disabled: Story = { ...Default, args: { disabled: true } };
