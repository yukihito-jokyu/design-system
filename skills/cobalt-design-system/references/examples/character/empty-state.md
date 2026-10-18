# EmptyState

- Registry: `@yukihi/cobalt-empty-state`
- Source: `registry/cobalt/character/empty-state/empty-state.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-empty-state
```

## 使用例

```tsx
import { EmptyState } from "@/components/character/empty-state";

<EmptyState title="まだ項目がありません" description="最初の項目を作成してください。" />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
