# AlertDialog

- Registry: `@yukihi/cobalt-alert-dialog`
- Source: `registry/cobalt/ui/alert-dialog/alert-dialog.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-alert-dialog
```

## 使用例

```tsx
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>削除する</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>削除しますか？</AlertDialogTitle>
      <AlertDialogDescription>この操作は取り消せません。</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>キャンセル</AlertDialogCancel>
      <AlertDialogAction variant="destructive">削除</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
