# IconButton

- Registry: `@yukihi/cobalt-icon-button`
- Source: `registry/cobalt/ui/icon-button/icon-button.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-icon-button
```

## 使用例

```tsx
import { XIcon } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

<IconButton aria-label="閉じる">
  <XIcon size={20} />
</IconButton>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
