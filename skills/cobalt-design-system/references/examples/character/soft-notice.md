# SoftNotice

- Registry: `@yukihi/cobalt-soft-notice`
- Source: `registry/cobalt/character/soft-notice/soft-notice.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-soft-notice
```

## 使用例

```tsx
import { SoftNotice } from "@/components/character/soft-notice";

<SoftNotice title="確認" tone="warning">
  公開前に内容を確認してください。
</SoftNotice>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
