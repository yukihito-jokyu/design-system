import type { ReactNode } from "react";
import { Button } from "@/registry/new-york/ui/button/button";
import { Progress } from "@/registry/new-york/ui/progress/progress";
import { PageHeader } from "@/registry/new-york/patterns/page-header/page-header";
import { ErrorState } from "@/registry/new-york/patterns/error-state/error-state";

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
}) {
  const step = steps[currentStep];
  if (!step) return null;
  const last = currentStep === steps.length - 1;
  return (
    <main className="stack">
      <PageHeader title={title} headingLevel={1} />
      <p aria-live="polite">
        {currentStep + 1} / {steps.length}：{step.title}
      </p>
      <Progress value={((currentStep + 1) / steps.length) * 100} aria-label="入力の進行状況" />
      <section className="stack" aria-label={step.title}>
        {error && <ErrorState description={error} />}
        {step.content}
      </section>
      {dirty && (
        <p className="note" role="status">
          途中の入力があります。離れる前に確認してください。
        </p>
      )}
      <div className="actions">
        {currentStep > 0 && (
          <Button type="button" variant="outline" onClick={onBack} disabled={submitting}>
            戻る
          </Button>
        )}
        <Button type="button" onClick={last ? onSubmit : onNext} disabled={submitting}>
          {submitting ? "送信中…" : last ? "送信" : "次へ"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
            中止
          </Button>
        )}
      </div>
    </main>
  );
}
