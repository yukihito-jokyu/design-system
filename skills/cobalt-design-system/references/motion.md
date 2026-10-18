# Motionの指定と検証

正本は`registry/cobalt/styles/registry.json`の`meta.motion`と`css`。設定の解決は`motion-provider.tsx`、状態変化は`motion-feedback.ts`、位置変化は`motion-layout.ts`が担う。独自の時間やライブラリーで置き換えない。

## 優先順位

`motion`は`"inherit" | "on" | "off"`。最も近い明示指定を継承し、指定がなければON。子の`on`は親の`off`を上書きできる。OSの`prefers-reduced-motion: reduce`ではすべてOFFになる。

```tsx
import { DesignThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { Button } from "@/components/ui/button";

<DesignThemeProvider theme="light" motion="on">
  <MotionProvider motion="off">
    <Button>親のOFFを継承</Button>
    <Button motion="on">ここだけON（OSのreduce時はOFF）</Button>
  </MotionProvider>
</DesignThemeProvider>;
```

既存の独自部品で設定を解決する必要があるときだけ`useDesignMotion(motion)`を使う。DOMへ属性を付けるだけではReact Contextは子へ伝わらない。

## Propを置く場所

Button・Input・Patternなどは自身の`motion`を使う。Dialog・Sheet・AlertDialog・Select・Popover・TooltipはRootの`motion`で内側へ設定を伝える。Content・Triggerなどすべてのexportが`motion`を受け取るわけではないため、導入後の型を確認する。全体を止めるなら外側の`MotionProvider`を使う。SVGには動きのPropを追加しない。

Portalを独自に作る必要がある場合は[ThemePortal](examples/theme-provider.md)でテーマ・Token・Motionを引き継ぐ。既存OverlayのPortalを通常の`createPortal`に置き換えない。

## 状態の保持

- OFFへ変更したらCSSとWeb Animations APIの再生を停止する。入力値、選択、フォーカス、処理結果をリセットしない。
- ONへ戻しただけで登場・完了の演出を再生しない。処理中のSpinnerと不定Progressは再開する。OFFでも処理中のラベル・状態通知を残す。
- 開閉、段階変更、フォーカス復帰、業務処理をアニメーション完了まで待たせない。閉じる動作は即時。
- 連続操作は最新状態を優先する。Tabsは途中の位置から次へ接続し、一覧とステップは前の再生を中止する。

時間Tokenは押下90ms、選択180ms、フィードバック280ms、登場300ms、メニュー220ms、展開260ms、完了360ms。600px以下では登場距離12→8px、Sheet距離24→16px、浮き2→1pxへ共通CSSが切り替える。動きのない部品に比較用アニメーションを追加しない。

通常位置は`--cobalt-motion-rest-scale`と`--cobalt-motion-rest-translate`を維持する。CSSのOFF設定は時間0だけでなく`transition: none`も必要。独自変更をする場合はproduction buildでもOFF→ON時の不要な動きを確認する。

検証は[validation.md](validation.md)の組み合わせで行う。
