# Input

- Registry: `@yukihi/cobalt-input`
- Source: `registry/cobalt/ui/input/input.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-input
```

## 使用例

```tsx
import { Input } from "@/components/ui/input";

<Input aria-label="名前" />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。

寸法の指定は`controlSize="sm" | "md" | "lg"`。HTMLの`size`とは用途が異なる。`motion`はinvalid時のフィードバックを制御する。ラベルとエラーの結び付けには`FormField`を使う。
