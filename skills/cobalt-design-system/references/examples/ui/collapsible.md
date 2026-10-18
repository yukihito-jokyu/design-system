# Collapsible

- Registry: `@yukihi/cobalt-collapsible`
- Source: `registry/cobalt/ui/collapsible/collapsible.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-collapsible
```

## 使用例

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

<Collapsible />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
