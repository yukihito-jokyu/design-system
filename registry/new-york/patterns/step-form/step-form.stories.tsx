import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
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
            氏名 <input />
          </label>
        ),
      },
      { id: "review", title: "確認", content: <p>入力内容を確認</p> },
    ],
    currentStep: 0,
    onNext: () => alert("次へ"),
    onBack: () => {},
    onSubmit: () => alert("送信"),
  },
} satisfies Meta<typeof StepForm>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const EmptyOrFailure: Story = { args: { currentStep: 1, error: "送信できませんでした" } };
export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };

export const Interactive: Story = {
  render: (args) => {
    function Example() {
      const [currentStep, setCurrentStep] = useState(0);
      const [value, setValue] = useState("");
      const [error, setError] = useState<string>();

      return (
        <StepForm
          {...args}
          steps={[
            {
              id: "input",
              title: "入力",
              content: (
                <label>
                  氏名 <input value={value} onChange={(event) => setValue(event.target.value)} />
                </label>
              ),
            },
            { id: "review", title: "確認", content: <p>氏名：{value}</p> },
          ]}
          currentStep={currentStep}
          error={error}
          onNext={() =>
            value.trim()
              ? (setError(undefined), setCurrentStep(1))
              : setError("氏名を入力してください")
          }
          onBack={() => setCurrentStep(0)}
          onSubmit={() => alert("送信しました")}
        />
      );
    }

    return <Example />;
  },
};
