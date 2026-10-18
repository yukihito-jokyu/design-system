# Dialog

- Registry: `@yukihi/cobalt-dialog`
- Source: `registry/cobalt/ui/dialog/dialog.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-dialog
```

## 使用例

```tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>詳細を開く</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>詳細</DialogTitle>
      <DialogDescription>内容を確認します。</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
