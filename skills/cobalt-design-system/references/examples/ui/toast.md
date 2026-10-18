# toast

- Registry: `@yukihi/cobalt-toast`
- Source: `registry/cobalt/ui/toast/toast.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-toast @yukihi/cobalt-button
```

## 使用例

```tsx
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "@/components/ui/toast";

<Toaster />;
<Button onClick={() => toast.success("保存しました")}>保存する</Button>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
