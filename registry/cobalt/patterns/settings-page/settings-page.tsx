import type { ReactNode } from "react";
import { Button } from "@/registry/cobalt/ui/button/button";
import { PageHeader } from "@/registry/cobalt/patterns/page-header/page-header";
import { SettingsSection } from "@/registry/cobalt/patterns/settings-section/settings-section";
import { ErrorState } from "@/registry/cobalt/patterns/error-state/error-state";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export type SettingsGroup = {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  onSave: () => void;
  saving?: boolean;
  saved?: boolean;
  error?: string;
  dangerous?: boolean;
  actionLabel?: string;
  busyLabel?: string;
};

export function SettingsPage({
  title,
  description,
  groups,
  motion = "inherit",
}: {
  title: string;
  description?: string;
  groups: SettingsGroup[];
  motion?: MotionPreference;
}) {
  const effective = useDesignMotion(motion);
  const regular = groups.filter((group) => !group.dangerous);
  const dangerous = groups.filter((group) => group.dangerous);

  const renderGroup = (group: SettingsGroup, headingLevel: 2 | 3) => (
    <SettingsSection
      key={group.id}
      title={group.title}
      description={group.description}
      headingLevel={headingLevel}
    >
      <fieldset
        className="cobalt-edit-fields"
        aria-label={group.title}
        aria-busy={group.saving}
        disabled={group.saving}
      >
        {group.content}
      </fieldset>
      {group.error && (
        <ErrorState
          title={group.dangerous ? "設定を初期化できませんでした" : "設定を保存できませんでした"}
          description={group.error}
        />
      )}
      {group.saved && (
        <p
          role="status"
          className="cobalt-note cobalt-feedback-notice"
          data-cobalt-motion={effective}
        >
          {group.dangerous ? "初期化しました。" : "保存しました。"}
        </p>
      )}
      <div className="cobalt-edit-actions">
        <Button
          type="button"
          variant={group.dangerous ? "destructive" : "default"}
          disabled={group.saving}
          loading={group.saving}
          onClick={group.onSave}
        >
          {group.saving ? (group.busyLabel ?? "保存中…") : (group.actionLabel ?? "保存")}
        </Button>
      </div>
    </SettingsSection>
  );

  return (
    <MotionProvider motion={motion}>
      <main className="cobalt-stack cobalt-pattern-page">
        <PageHeader title={title} description={description} headingLevel={1} />
        {regular.map((group) => renderGroup(group, 2))}
        {dangerous.length > 0 && (
          <section className="cobalt-stack cobalt-settings-danger" aria-label="危険な設定">
            <h2>危険な設定</h2>
            {dangerous.map((group) => renderGroup(group, 3))}
          </section>
        )}
      </main>
    </MotionProvider>
  );
}
