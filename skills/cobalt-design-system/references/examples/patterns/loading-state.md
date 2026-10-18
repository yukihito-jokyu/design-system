# LoadingState

- Registry: `@yukihi/cobalt-loading-state`
- Source: `registry/cobalt/patterns/loading-state/loading-state.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-loading-state
```

## 使用例

```tsx
import { LoadingState } from "@/components/patterns/loading-state";

<LoadingState loading={loading}>読み込み後の内容</LoadingState>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
