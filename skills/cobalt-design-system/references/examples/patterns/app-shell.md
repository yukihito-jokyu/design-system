# AppShell

- Registry: `@yukihi/cobalt-app-shell`
- Source: `registry/cobalt/patterns/app-shell/app-shell.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-app-shell @yukihi/cobalt-page-header
```

## 使用例

```tsx
import { PageHeader } from "@/components/patterns/page-header";
import { AppShell } from "@/components/patterns/app-shell";

<AppShell navigation={<a href="/">ホーム</a>}>
  <PageHeader title="ホーム" />
</AppShell>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
