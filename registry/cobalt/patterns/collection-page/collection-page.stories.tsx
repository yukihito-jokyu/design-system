import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState, useEffect, useId } from "react";
import { FileTextIcon, RefreshCwIcon } from "lucide-react";
import { CollectionPage } from "./collection-page";
import { AppShell } from "@/registry/cobalt/patterns/app-shell/app-shell";
import { SearchField } from "@/registry/cobalt/patterns/search-field/search-field";
import { Button } from "@/registry/cobalt/ui/button/button";
import { Badge } from "@/registry/cobalt/ui/badge/badge";
import { Card, CardContent } from "@/registry/cobalt/ui/card/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/registry/cobalt/ui/breadcrumb/breadcrumb";

import { Input } from "@/registry/cobalt/ui/input/input";
import { Textarea } from "@/registry/cobalt/ui/textarea/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/cobalt/ui/select/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/registry/cobalt/ui/dialog/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/registry/cobalt/ui/alert-dialog/alert-dialog";
import { Toaster, toast } from "@/registry/cobalt/ui/toast/toast";
import { expect, within } from "storybook/test";
import { FormField } from "@/registry/cobalt/patterns/form-field/form-field";
import { EditPage } from "@/registry/cobalt/patterns/edit-page/edit-page";

const statuses = ["公開済み", "確認待ち", "要修正", "下書き"] as const;
type Status = (typeof statuses)[number];

const variants = {
  公開済み: "success",
  確認待ち: "warning",
  要修正: "destructive",
  下書き: "secondary",
} as const;

const articles = [
  {
    id: "1",
    title: "秋の新サービスを公開しました",
    description: "新しく始まるサービスの内容と、ご利用方法を紹介します。",
    category: "お知らせ",
    status: "公開済み" as Status,
    date: "2026.10.16",
  },
  {
    id: "2",
    title: "はじめての方へ：ご利用ガイド",
    description: "登録から最初の設定まで、順番にご案内します。",
    category: "ご利用ガイド",
    status: "確認待ち" as Status,
    date: "2026.10.15",
  },
  {
    id: "3",
    title: "導入事例インタビュー",
    description: "日々の業務での活用方法を伺いました。",
    category: "導入事例",
    status: "要修正" as Status,
    date: "2026.10.14",
  },
  {
    id: "4",
    title: "チームで使うための設定",
    description: "メンバーの招待と、権限設定について。",
    category: "ご利用ガイド",
    status: "下書き" as Status,
    date: "2026.10.13",
  },
  {
    id: "5",
    title: "10月のアップデート",
    description: "今月追加した機能と改善点をまとめました。",
    category: "お知らせ",
    status: "公開済み" as Status,
    date: "2026.10.12",
  },
];

const meta = {
  title: "Cobalt/Patterns/CollectionPage",
  component: CollectionPage,
  parameters: { designSystem: "cobalt", layout: "fullscreen" },
  args: {
    title: "記事一覧",
    description: "記事を探して、公開状況を確認できます。",
    rows: articles,
    columns: [],
    getRowId: (row: unknown) => (row as { id: string }).id,
    caption: "記事一覧",
    motion: "inherit",
  },
  argTypes: {
    motion: {
      description:
        "絞り込み後の一覧を追いやすくする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
    rows: { control: false },
    columns: { control: false },
    getRowId: { control: false },
  },
} satisfies Meta<typeof CollectionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

type Article = (typeof articles)[number];
type Draft = Pick<Article, "title" | "description" | "status">;

function ArticleEditor({
  article,
  failFirstSave,
  onSave,
  onClose,
  onReturnFocus,
}: {
  article: Article | null;
  failFirstSave: boolean;
  onSave: (draft: Draft) => void;
  onClose: () => void;
  onReturnFocus: () => void;
}) {
  const [initial] = useState<Draft>({
    title: article?.title ?? "",
    description: article?.description ?? "",
    status: article?.status ?? "下書き",
  });

  const [draft, setDraft] = useState(initial);
  const [titleError, setTitleError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const busy = useRef(false);
  const attempts = useRef(0);
  const discarding = useRef(false);
  const beforeDiscardRef = useRef<HTMLElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);

  const dirty =
    draft.title !== initial.title ||
    draft.description !== initial.description ||
    draft.status !== initial.status;

  const requestClose = () => {
    if (busy.current) return;
    if (dirty) {
      beforeDiscardRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setConfirmDiscard(true);
    } else onClose();
  };

  const submit = () => {
    if (busy.current) return;
    if (!draft.title.trim() || draft.title.length > 120) {
      setTitleError(
        !draft.title.trim()
          ? "タイトルを入力してください。"
          : "タイトルは120文字以内で入力してください。",
      );
      titleRef.current?.focus();
      return;
    }
    setTitleError("");
    setError("");
    busy.current = true;
    setSubmitting(true);
    // Story内だけで保存の待機・失敗・再試行を再現する。
    timeout.current = setTimeout(() => {
      busy.current = false;
      setSubmitting(false);
      attempts.current += 1;
      if (failFirstSave && attempts.current === 1) {
        setError("通信に失敗しました。入力内容は残っています。もう一度保存してください。");
        return;
      }
      onSave({ ...draft, title: draft.title.trim() });
    }, 700);
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
    >
      <DialogContent
        showCloseButton={!submitting}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          titleRef.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onReturnFocus();
        }}
        onEscapeKeyDown={(event) => {
          if (busy.current) event.preventDefault();
        }}
        onInteractOutside={(event) => {
          if (busy.current) event.preventDefault();
        }}
      >
        <EditPage
          title={article ? "記事を編集" : "記事を作成"}
          variant={article ? "edit" : "create"}
          contentElement="section"
          noValidate
          dirty={dirty}
          submitting={submitting}
          error={error}
          onSubmit={submit}
          onCancel={requestClose}
          header={
            <DialogHeader>
              <DialogTitle>{article ? "記事を編集" : "記事を作成"}</DialogTitle>
              <DialogDescription>タイトル・概要・公開状況を変更できます。</DialogDescription>
            </DialogHeader>
          }
        >
          <FormField
            label="タイトル"
            required
            description="120文字以内で入力してください。"
            error={titleError}
          >
            {(binding) => (
              <Input
                {...binding}
                ref={titleRef}
                value={draft.title}
                onChange={(event) => {
                  setDraft({ ...draft, title: event.target.value });
                  if (titleError) setTitleError("");
                }}
              />
            )}
          </FormField>
          <FormField label="概要">
            {(binding) => (
              <Textarea
                {...binding}
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              />
            )}
          </FormField>
          <FormField label="公開状況">
            {(binding) => (
              <Select
                value={draft.status}
                onValueChange={(value) => setDraft({ ...draft, status: value as Status })}
                disabled={submitting}
              >
                <SelectTrigger {...binding}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormField>
        </EditPage>
        <AlertDialog open={confirmDiscard} onOpenChange={setConfirmDiscard}>
          <AlertDialogContent
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              if (!discarding.current) {
                if (beforeDiscardRef.current?.isConnected) beforeDiscardRef.current.focus();
                else titleRef.current?.focus();
              }
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>変更を破棄しますか？</AlertDialogTitle>
              <AlertDialogDescription>保存していない変更は失われます。</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>編集を続ける</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  discarding.current = true;
                  onClose();
                }}
              >
                変更を破棄
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}

function Example({
  initialEdit = false,
  failFirstSave = false,
  ...args
}: React.ComponentProps<typeof CollectionPage> & {
  initialEdit?: boolean;
  failFirstSave?: boolean;
}) {
  const [rows, setRows] = useState(args.rows as Article[]);

  const [editor, setEditor] = useState<{ article: Article | null } | null>(() =>
    initialEdit ? { article: args.rows[0] as Article } : null,
  );

  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const createRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(6);
  const toasterId = useId();

  const openEditor = (article: Article | null, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    setEditor({ article });
  };

  const filtersRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "すべて">("すべて");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(Boolean(args.error));
  const [notice, setNotice] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);

  const clear = () => {
    setQuery("");
    setStatus("すべて");
    filtersRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  };

  const reload = () => {
    if (loading) return;
    setLoading(true);
    setNotice("");
    timeout.current = setTimeout(() => {
      setFailed(false);
      setLoading(false);
      setNotice("一覧を更新しました。");
    }, 500);
  };

  return (
    <AppShell
      contentElement="section"
      motion={args.motion}
      navigation={
        <div className="cobalt-stack">
          <span className="cobalt-brand">
            cobalt<span aria-hidden="true">.</span>
          </span>
          <a className="cobalt-nav-link" href="#articles" aria-current="page">
            <FileTextIcon aria-hidden="true" />
            記事一覧
          </a>
        </div>
      }
    >
      <div id="articles" className="cobalt-stack">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#articles">ホーム</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>記事一覧</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CollectionPage
          {...args}
          rows={rows}
          loading={Boolean(args.loading) || loading}
          error={failed && !loading ? args.error : undefined}
          onRetry={reload}
          actions={
            <>
              <Button
                type="button"
                ref={createRef}
                aria-haspopup="dialog"
                onClick={(event) => openEditor(null, event.currentTarget)}
              >
                記事を作成
              </Button>
              <Button type="button" variant="outline" size="sm" loading={loading} onClick={reload}>
                <RefreshCwIcon aria-hidden="true" />
                {loading ? "更新中…" : "一覧を更新"}
              </Button>
            </>
          }
          filterRow={
            rows.length
              ? (item) => {
                  const row = item as (typeof articles)[number];
                  return (
                    (status === "すべて" || row.status === status) &&
                    `${row.title} ${row.description} ${row.category}`
                      .toLocaleLowerCase()
                      .includes(query.toLocaleLowerCase().trim())
                  );
                }
              : undefined
          }
          filters={
            <div className="cobalt-collection-filters" ref={filtersRef}>
              <SearchField label="記事を検索" value={query} onValueChange={setQuery} />
              <div className="cobalt-filter-group" role="group" aria-label="公開状況で絞り込み">
                {["すべて", ...statuses].map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant="outline"
                    size="sm"
                    aria-pressed={status === item}
                    onClick={() => setStatus(item as Status | "すべて")}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          }
          emptyAction={
            query || status !== "すべて" ? (
              <Button type="button" variant="outline" onClick={clear}>
                条件をクリア
              </Button>
            ) : undefined
          }
          renderList={(items) => (
            <ul className="cobalt-record-list">
              {(items as typeof articles).map((row) => (
                <li key={row.id}>
                  <Card>
                    <CardContent>
                      <article className="cobalt-record">
                        <div className="cobalt-stack">
                          <span className="cobalt-note">{row.category}</span>
                          <h2 className="cobalt-record-title">{row.title}</h2>
                          <p className="cobalt-note">{row.description}</p>
                        </div>
                        <div className="cobalt-record-meta">
                          <Badge variant={variants[row.status]}>{row.status}</Badge>
                          <span className="cobalt-note">更新 {row.date}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            aria-haspopup="dialog"
                            aria-label={`${row.title}を編集`}
                            onClick={(event) => openEditor(row, event.currentTarget)}
                          >
                            編集
                          </Button>
                        </div>
                      </article>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        />
        <p role="status" className="cobalt-note">
          {notice}
        </p>
      </div>
      <Toaster id={toasterId} closeButton position="bottom-right" />
      {editor && (
        <ArticleEditor
          article={editor.article}
          failFirstSave={failFirstSave}
          onClose={() => setEditor(null)}
          onReturnFocus={() => {
            const target = returnFocusRef.current;
            if (target?.isConnected) target.focus();
            else createRef.current?.focus();
          }}
          onSave={(draft) => {
            const edited = editor.article;

            const created: Article = {
              ...draft,
              id: `new-${nextId.current++}`,
              category: "お知らせ",
              date: "2026.10.17",
            };

            setRows((previous) =>
              edited
                ? previous.map((row) => (row.id === edited.id ? { ...row, ...draft } : row))
                : [created, ...previous],
            );
            setEditor(null);
            toast.success(edited ? "記事を保存しました。" : "記事を作成しました。", { toasterId });
          }}
        />
      )}
    </AppShell>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Empty: Story = { ...Default, args: { rows: [] } };
export const Loading: Story = { ...Default, args: { loading: true } };

export const Failure: Story = {
  ...Default,
  args: { error: "記事を読み込めませんでした。時間をおいて再試行してください。" },
};

export const LongTitle: Story = {
  ...Default,
  name: "長いタイトル",
  args: {
    rows: [
      {
        ...articles[0],
        title: "チームの新しい取り組みと、これからご利用いただけるサービスについてのお知らせ",
      },
    ],
  },
};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Editing: Story = { render: (args) => <Example {...args} initialEdit /> };

export const SaveFailure: Story = {
  render: (args) => <Example {...args} initialEdit failFirstSave />,
};

export const EditingMotionOff: Story = { ...Editing, args: { motion: "off" } };

export const Layout: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mobile = window.innerWidth < 768;
    const menu = canvas.queryByRole("button", { name: "メニュー" });
    if (mobile) await expect(menu).toBeVisible();
    else await expect(menu).toBeNull();
    const navigation = canvasElement.querySelector(".cobalt-app-shell-nav")!;
    if (mobile) await expect(navigation).not.toBeVisible();
    else await expect(navigation).toBeVisible();
    const article = canvas.getAllByRole("article")[0];
    const text = article.querySelector(".cobalt-stack")!.getBoundingClientRect();
    const metadata = article.querySelector(".cobalt-record-meta")!.getBoundingClientRect();
    if (mobile) await expect(metadata.top).toBeGreaterThanOrEqual(text.bottom);
    else await expect(metadata.left).toBeGreaterThanOrEqual(text.right);
    const create = canvas.getByRole("button", { name: "記事を作成" });
    await expect(getComputedStyle(create).fontSize).toBe(
      window.innerWidth <= 600 ? "14px" : "16px",
    );
    await expect(create.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      window.innerWidth <= 600 ? 40 : 48,
    );
    await expect(canvasElement.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(
      window.innerWidth,
    );
  },
};
