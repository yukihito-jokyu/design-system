# PageHeader

- Registry: `@yukihi/cobalt-page-header`
- Source: `registry/cobalt/patterns/page-header/page-header.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-page-header
```

## 使用例

```tsx
import { PageHeader } from "@/components/patterns/page-header";

<PageHeader title="設定" description="アプリの設定を変更します。" />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
