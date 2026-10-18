# NavigationMenu

- Registry: `@yukihi/cobalt-navigation-menu`
- Source: `registry/cobalt/ui/navigation-menu/navigation-menu.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-navigation-menu
```

## 使用例

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

<NavigationMenu />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
