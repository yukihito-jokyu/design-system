# Skeleton

- Registry: `@yukihi/cobalt-skeleton`
- Source: `registry/cobalt/ui/skeleton/skeleton.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-skeleton
```

## 使用例

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
