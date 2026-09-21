# 作業方針

日本語で簡潔に説明してください。承認済みの部品・配色・寸法・SVGを維持し、共通値は`registry/new-york/styles/registry.json`の`design-system-styles`を正本にします。SVGをテーマ色へ置き換えません。

このリポジトリはデザインシステム本体だけを管理します。承認済みPattern 18種類を閲覧するStorybook（`.storybook/`と原本に隣接するStory）だけを例外とし、Registry配布項目には含めません。それ以外のカタログ、画像原案、テスト用アプリ、検証画像、設計履歴を追加しないでください。検証用環境とStorybookの静的出力は外部の一時ディレクトリに作成します。

次のタスクはNEXT_TASK.mdを参照。pushや公開は明示的な依頼がある場合だけ行います。
