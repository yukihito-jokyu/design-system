import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/registry/cobalt/ui/button/button";
import { Progress } from "@/registry/cobalt/ui/progress/progress";
import { PageHeader } from "@/registry/cobalt/patterns/page-header/page-header";
import { useStepMotion } from "@/registry/cobalt/components/theme-provider/motion-layout";
import { ErrorState } from "@/registry/cobalt/patterns/error-state/error-state";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export type FormStep = { id: string; title: string; content: ReactNode };

export function StepForm({
  title,
  steps,
  currentStep,
  onNext,
  onBack,
  onSubmit,
  onCancel,
  submitting = false,
  error,
  dirty = false,
  motion = "inherit",
}: {
  title: string;
  steps: FormStep[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitting?: boolean;
  error?: string;
  dirty?: boolean;
  motion?: MotionPreference;
}) {
  const effective = useDesignMotion(motion);
  const step = steps[currentStep];
  const motionRef = useStepMotion(motion, currentStep);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(currentStep);
  // ステップが変わったときだけ移動先を伝え、初回のフォーカスは奪わない。
  useEffect(() => {
    if (step && previousStep.current !== currentStep) headingRef.current?.focus();
    previousStep.current = currentStep;
  }, [currentStep, step]);
  // 入力や送信に失敗したら、説明を確認できる位置へ移動する。
  useEffect(() => {
    if (error && !submitting) errorRef.current?.focus();
  }, [error, submitting]);
  if (!step) return null;
  const last = currentStep === steps.length - 1;
  return (
    <MotionProvider motion={motion}>
      <main className="cobalt-stack cobalt-pattern-page">
        <PageHeader title={title} headingLevel={1} />
        <p aria-live="polite">
          {currentStep + 1} / {steps.length}：{step.title}
        </p>
        <Progress value={((currentStep + 1) / steps.length) * 100} aria-label="入力の進行状況" />
        <section
          ref={motionRef}
          data-cobalt-motion={effective}
          className="cobalt-stack cobalt-step-content"
          aria-label={step.title}
          aria-busy={submitting}
        >
          <h2 className="cobalt-step-heading" ref={headingRef} tabIndex={-1}>
            {step.title}
          </h2>
          {error && (
            <div ref={errorRef} tabIndex={-1} role="group" aria-label="入力・送信エラー">
              <ErrorState description={error} />
            </div>
          )}
          <fieldset className="cobalt-edit-fields" disabled={submitting}>
            {step.content}
          </fieldset>
        </section>
        {dirty && (
          <p className="cobalt-note" role="status">
            途中の入力があります。離れる前に確認してください。
          </p>
        )}
        <div className="cobalt-edit-actions">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={onBack} disabled={submitting}>
              戻る
            </Button>
          )}
          <Button
            type="button"
            onClick={last ? onSubmit : onNext}
            disabled={submitting}
            loading={submitting}
          >
            {submitting ? "送信中…" : last ? "送信" : "次へ"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
              中止
            </Button>
          )}
        </div>
      </main>
    </MotionProvider>
  );
}
