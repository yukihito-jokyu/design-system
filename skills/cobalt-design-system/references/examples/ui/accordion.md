# Accordion

- Registry: `@yukihi/cobalt-accordion`
- Source: `registry/cobalt/ui/accordion/accordion.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-accordion
```

## 使用例

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="help">
    <AccordionTrigger>ヘルプ</AccordionTrigger>
    <AccordionContent>説明です。</AccordionContent>
  </AccordionItem>
</Accordion>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
