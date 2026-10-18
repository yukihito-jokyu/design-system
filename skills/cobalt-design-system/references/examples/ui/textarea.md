# Textarea

- Registry: `@yukihi/cobalt-textarea`
- Source: `registry/cobalt/ui/textarea/textarea.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-textarea
```

## 使用例

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea aria-label="本文" />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
