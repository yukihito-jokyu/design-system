# Tabs

- Registry: `@yukihi/cobalt-tabs`
- Source: `registry/cobalt/ui/tabs/tabs.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-tabs
```

## 使用例

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="draft">
  <TabsList>
    <TabsTrigger value="draft">下書き</TabsTrigger>
  </TabsList>
  <TabsContent value="draft">内容</TabsContent>
</Tabs>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
