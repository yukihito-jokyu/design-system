import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import { useRef, useState } from "react";
import { Input } from "@/registry/cobalt/ui/input/input";
import { StepForm } from "./step-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/cobalt/ui/alert-dialog/alert-dialog";

const meta = {
  title: "Cobalt/Patterns/StepForm",
  parameters: { designSystem: "cobalt" },
  component: StepForm,
  argTypes: {
    motion: {
      description:
        "進む・戻るの方向と到達を伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
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
  const [value, setValue] = useState(args.currentStep > 0 ? "山田" : "");
  const [submitting, setSubmitting] = useState(false);
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
                aria-invalid={currentStep === 0 && Boolean(error)}
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </label>
          ),
        },
        { id: "review", title: "確認", content: <p>氏名：{value || "未入力"}</p> },
      ]}
      currentStep={currentStep}
      dirty={args.dirty || Boolean(value)}
      submitting={args.submitting || submitting}
      error={error}
      onNext={() =>
        value.trim() ? (setError(undefined), setCurrentStep(1)) : setError("氏名を入力してください")
      }
      onBack={() => setCurrentStep(0)}
      onSubmit={() => {
        if (!value.trim()) {
          setError("氏名を入力してください");
          return;
        }
        setError(undefined);
        setSubmitting(true);
        setTimeout(() => setSubmitted(true), 500);
      }}
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

export const Interactive: Story = {
  ...Default,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    if (args.motion === "off")
      for (const element of canvasElement.querySelectorAll("[data-cobalt-motion]")) {
        await expect(element).toHaveAttribute("data-cobalt-motion", "off");
        await expect(getComputedStyle(element).transitionDuration).toMatch(/^0s(, 0s)*$/);
      }
    await userEvent.click(canvas.getByRole("button", { name: "次へ" }));
    await waitFor(() =>
      expect(canvas.getByRole("group", { name: "入力・送信エラー" })).toHaveFocus(),
    );
    await userEvent.type(canvas.getByRole("textbox", { name: "氏名" }), "山田");
    await userEvent.click(canvas.getByRole("button", { name: "次へ" }));
    await waitFor(() => expect(canvas.getByRole("heading", { name: "確認" })).toHaveFocus());
    const section = canvas.getByRole("heading", { name: "確認" }).closest("section")!;
    const animations = section.getAnimations();
    if (section.dataset.cobaltMotion === "on") {
      await expect(
        animations.some((animation) =>
          (animation.effect as KeyframeEffect)
            .getKeyframes()
            .some(
              (frame) =>
                parseFloat(String(frame.translate)) ===
                parseFloat(getComputedStyle(section).getPropertyValue("--cobalt-motion-distance")),
            ),
        ),
      ).toBe(true);
      await Promise.allSettled(animations.map((animation) => animation.finished));
    } else await expect(animations).toHaveLength(0);
    await expect(canvas.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    await userEvent.click(canvas.getByRole("button", { name: "戻る" }));
    await waitFor(() => expect(canvas.getByRole("heading", { name: "入力" })).toHaveFocus());
    await expect(canvas.getByRole("textbox", { name: "氏名" })).toHaveValue("山田");
    await userEvent.click(canvas.getByRole("button", { name: "次へ" }));
    await userEvent.click(canvas.getByRole("button", { name: "送信" }));
    await expect(canvas.getByRole("button", { name: "送信中…" })).toBeDisabled();
    await expect(canvas.getByRole("button", { name: "戻る" })).toBeDisabled();
    await waitFor(() => expect(canvas.getByText("申請を送信しました。")).toBeVisible());
  },
};

export const InteractiveMotionOff: Story = { ...Interactive, args: { motion: "off" } };

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Review: Story = { ...Default, args: { currentStep: 1 } };
export const Submitting: Story = { ...Default, args: { currentStep: 1, submitting: true } };

export const SubmissionFailure: Story = {
  ...Default,
  args: { currentStep: 1, error: "送信できませんでした。もう一度お試しください。" },
};

function CancellationExample(args: React.ComponentProps<typeof StepForm>) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [confirming, setConfirming] = useState(false);
  return cancelled ? (
    <p role="status">申請を中止しました。</p>
  ) : (
    <>
      <StepForm
        {...args}
        onCancel={() => {
          triggerRef.current = document.activeElement as HTMLElement;
          setConfirming(true);
        }}
      />
      <AlertDialog motion={args.motion} open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (triggerRef.current?.isConnected) triggerRef.current.focus();
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>申請を中止しますか？</AlertDialogTitle>
            <AlertDialogDescription>途中の入力は保存されません。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>入力を続ける</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => setCancelled(true)}>
              中止する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export const WithCancel: Story = {
  ...Default,
  args: { onCancel: () => {}, dirty: true },
  render: (args) => <CancellationExample {...args} />,
};

export const CancelInteraction: Story = {
  ...WithCancel,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByRole("button", { name: "中止" }));
    const dialog = within(body.getByRole("alertdialog"));
    await waitFor(() => expect(dialog.getByRole("button", { name: "入力を続ける" })).toHaveFocus());
    await userEvent.click(dialog.getByRole("button", { name: "入力を続ける" }));
    await waitFor(() => expect(canvas.getByRole("button", { name: "中止" })).toHaveFocus());
    await userEvent.click(canvas.getByRole("button", { name: "中止" }));
    await userEvent.click(body.getByRole("button", { name: "中止する" }));
    await waitFor(() => expect(canvas.getByText("申請を中止しました。")).toBeVisible());
  },
};
