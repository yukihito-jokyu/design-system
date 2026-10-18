# ErrorState

- Registry: `@yukihi/cobalt-error-state`
- Source: `registry/cobalt/patterns/error-state/error-state.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-error-state
```

## 使用例

```tsx
import { ErrorState } from "@/components/patterns/error-state";

<ErrorState description="読み込みに失敗しました。" onRetry={() => {}} />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
