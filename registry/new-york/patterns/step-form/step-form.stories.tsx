import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from "@/registry/new-york/ui/input/input";
import { StepForm } from "./step-form";

const meta = {
  title: "Patterns/StepForm",
  component: StepForm,
  args: {
    title: "申請",
    steps: [
      {
        id: "input",
        title: "入力",
        content: (
          <label>
            氏名 <Input name="name" required />
          </label>
        ),
      },
      { id: "review", title: "確認", content: <p>入力内容を確認</p> },
    ],
    currentStep: 0,
    onNext: () => {},
    onBack: () => {},
    onSubmit: () => {},
  },
} satisfies Meta<typeof StepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof StepForm>) {
  const [currentStep, setCurrentStep] = useState(args.currentStep);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>(args.error);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <p role="status">申請を送信しました。</p>;

  return (
    <StepForm
      {...args}
      steps={[
        {
          id: "input",
          title: "入力",
          content: (
            <label>
              氏名{" "}
              <Input
                name="name"
                required
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </label>
          ),
        },
        { id: "review", title: "確認", content: <p>氏名：{value || "未入力"}</p> },
      ]}
      currentStep={currentStep}
      error={error}
      onNext={() =>
        value.trim() ? (setError(undefined), setCurrentStep(1)) : setError("氏名を入力してください")
      }
      onBack={() => setCurrentStep(0)}
      onSubmit={() => (value.trim() ? setSubmitted(true) : setError("氏名を入力してください"))}
    />
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };

export const EmptyOrFailure: Story = {
  ...Default,
  args: { currentStep: 0, error: "入力内容を確認してください" },
};

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Interactive: Story = { ...Default };
