# 導入と配布名

## 導入前

React・Tailwind CSS v4・Radixベースのアプリを対象とする。既存の`components.json`とaliasを確認する。new-yorkとcobaltは導入先が重なるため、同一アプリで併用しない。移行を依頼されていないアプリの既存システムを上書きしない。

`@yukihi`は共通のnamespace。新しいnamespaceは登録しない。正式URLは`https://design.yukihi.tokyo/v1/r/{name}.json`。公開URLで必要な項目を取得できることを確認して使う。リポジトリへのマージだけで本番公開済みと判断しない。

## 個別導入

```sh
npx shadcn@4.21.0 view @yukihi/cobalt-button
npx shadcn@4.21.0 add @yukihi/cobalt-button
npx shadcn@4.21.0 add @yukihi/cobalt-theme-provider
```

`view`でPropsの実装・依存・導入先を読み、必要な項目だけ導入する。依存する共通CSS・補助機能・部品はCLIが追加する。個別SVGが必要なら`@yukihi/cobalt-ink-idea-feature-icon`などを選び、全SVGを不用意に導入しない。

| Registry名                     | 代表的な導入先・export                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `cobalt-button`                | `@/components/ui/button` → `Button`                                                                      |
| `cobalt-collection-page`       | `@/components/patterns/collection-page` → `CollectionPage`                                               |
| `cobalt-assistant-card`        | `@/components/character/assistant-card` → `AssistantCard`                                                |
| `cobalt-theme-provider`        | `@/components/theme-provider` → `DesignThemeProvider`、`@/components/motion-provider` → `MotionProvider` |
| `cobalt-character-icons`       | `@/components/character` → `CharacterIcon`・`FeatureIcon`・`StatusBubble`                                |
| `cobalt-ink-idea-feature-icon` | `@/components/icons/InkIdeaFeatureIcon` → `InkIdeaFeatureIcon`                                           |
| `cobalt-use-mobile`            | `@/hooks/use-mobile` → `useIsMobile`                                                                     |
| `cobalt-utils`                 | `@/lib/utils` → `cn`                                                                                     |

`@/`と各ディレクトリは標準aliasの例。実際は`components.json`のaliasesに従う。原本の`@/registry/cobalt/...`を利用アプリへコピーせず、CLIが変換したimportを使う。

## 一括導入・新規init

```sh
# 既存のRadixアプリにcobalt全体が必要な場合
npx shadcn@4.21.0 add @yukihi/cobalt-design-system

# 公開先で取得できることを確認した後、新規Viteアプリを作る場合
npx shadcn@4.21.0 init https://design.yukihi.tokyo/v1/r/cobalt-design-system.json --template vite --base radix --name my-cobalt-app --yes
```

`@yukihi/design-system`はnew-york専用。一括導入`cobalt-design-system`にはcobaltだけが含まれる。ソースの索引は`registry/cobalt/registry.json`、生成JSONは共通のフラットな`public/r/`、公開配置は`dist/v1/r/`。

## CSSとProvider

アプリのTailwind入口CSSを残し、CLIが共通CSS・`@theme inline`・Google Fonts importを反映したことを確認する。別途StorybookのCSSを読み込まない。Noto Sans JPの400/500/600/700は共通CSSから取得する。

CLIが追加したGoogle Fontsのimportは、Tailwindのimportより前へ移す。同じ行を重複追加しない。Tailwindより後にあると、ビルドで展開されたCSS規則の後ろに残り、ブラウザーがフォントのimportを無視する。再導入後も順序を確認する。

```css
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap");
@import "tailwindcss";
/* 以下の共通CSSはCLIが同じ入口へ反映する。 */
```

アプリの入口でこのCSSを一度importし、[Provider使用例](examples/theme-provider.md)で囲む。

## リポジトリ内の変更を公開前に検証する

リポジトリ側で生成物を検査し、外部一時ディレクトリへ公開相当の配置を作る。

```sh
npm run registry:check
npm run registry:prepare -- /tmp/cobalt-skill-dist
REGISTRY_ROOT=/tmp/cobalt-skill-dist REGISTRY_BASE_URL=http://127.0.0.1:4173/v1/r npm run registry:serve
```

別の端末で外部一時アプリに移り、検証用namespace設定を登録する。

```sh
npx shadcn@4.21.0 registry add '@yukihi=http://127.0.0.1:4173/v1/r/{name}.json'
npx shadcn@4.21.0 view @yukihi/cobalt-button
npx shadcn@4.21.0 add @yukihi/cobalt-button
```

一括導入は`add @yukihi/cobalt-design-system`、新規initは上記のURLを`http://127.0.0.1:4173/v1/r/cobalt-design-system.json`へ置き換える。ローカル設定を本番用アプリへ残さない。push・公開はこの手順に含めず、明示的な依頼を受ける。
