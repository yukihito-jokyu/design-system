---
name: cobalt-design-system
description: React UIを青と白のcobaltデザインシステムで実装・変更するときに使用する。cobaltのRegistry導入、部品・画面Pattern・操作ルールの選択、共通値、レスポンシブ表示、Motionの設定と検証を扱う。既存new-yorkを使う画面には適用しない。
---

# Cobalt Design System

## 作業手順

1. 利用アプリの`components.json`、Radixベース、`@yukihi`の参照先と導入済みシステムを確認する。同一アプリでnew-yorkとcobaltを併用しない。システム未指定で既存画面からも判断できない場合は選択を確認する。
2. [references/pattern-selection.md](references/pattern-selection.md)で画面の主目的と7操作ルールを選び、[references/component-selection.md](references/component-selection.md)で18 Patternの内側の部品を選ぶ。
3. 対象の`references/examples/<分類>/<item>.md`を読む。分類は`ui`・`character`・`patterns`・`icons`・`hooks`・`lib`。Providerは[使用例](references/examples/theme-provider.md)を読む。名称が未確定ならファイル名や本文を検索する。
4. [references/installation.md](references/installation.md)に従い、`view @yukihi/cobalt-<item>`で実際のAPI・依存・targetを確認してから必要な項目を`add`する。一括導入は全体が必要な場合に選ぶ。
5. 配色・寸法・SVGは[references/tokens.md](references/tokens.md)、動きは[references/motion.md](references/motion.md)を読み、`DesignThemeProvider theme="light"`の内側で組み立てる。
6. [references/validation.md](references/validation.md)でPC・スマホの見た目、操作、Motionと導入後の型検査・lint・production buildを確認する。

## 守ること

- 既存Patternで表現できる画面を低水準部品から作り直さない。通信、認可、保存、ルーティングは利用アプリで実装する。
- 共通値とCSSの正本は`registry/cobalt/styles/registry.json`の`cobalt-design-system-styles`。配布後は`view`で確認できる。同名のnew-yorkの値や5テーマを流用せず、共通値をハードコードしない。
- Registry名は`cobalt-`付き、導入先とexport名は接頭辞なし。たとえば`@yukihi/cobalt-button`は`@/components/ui/button`の`Button`になる。実際のaliasは利用アプリの`components.json`に従う。
- SVGの形・固有色・名前付きexport、StatusBubbleの独自配色を維持する。テーマ色へ置換しない。
- Portalへのテーマ・Token・Motion継承、disabled・invalid・loading、IME入力、フォーカス復帰を維持する。
- MotionのON/OFFは`motion="inherit" | "on" | "off"`で設定し、Reduced Motionを最優先する。部品によってPropを置く場所が異なるため[Motionの配置](references/motion.md)を確認する。

## 例の読み方

例は承認済みAPIの最小構成を示す。文言・データ・callbackは要件に合わせて変更する。例中の値やcallbackが省略されている場合は利用アプリで定義し、通信が実装済みとは扱わない。import、部品構成、アクセシビリティ属性、Tokenの用途を維持する。画面全体の組み合わせは[一覧・編集画面の例](references/examples/screens.md)を参照する。
