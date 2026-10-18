# Card

- Registry: `@yukihi/cobalt-card`
- Source: `registry/cobalt/ui/card/card.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-card
```

## 使用例

```tsx
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>設定</CardTitle>
  </CardHeader>
  <CardContent>内容</CardContent>
</Card>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
