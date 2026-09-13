import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "oxc", "react", "import", "promise"],
  jsPlugins: ["@stylistic/eslint-plugin"],
  categories: {
    correctness: "error",
  },
  options: {
    typeAware: true,
  },
  rules: {
    "@stylistic/padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: {
          selector:
            "FunctionDeclaration, ExportNamedDeclaration[declaration.type='FunctionDeclaration'], ExportDefaultDeclaration[declaration.type='FunctionDeclaration']",
        },
      },
      {
        blankLine: "always",
        prev: {
          selector:
            "FunctionDeclaration, ExportNamedDeclaration[declaration.type='FunctionDeclaration'], ExportDefaultDeclaration[declaration.type='FunctionDeclaration']",
        },
        next: "*",
      },
      {
        blankLine: "always",
        prev: "*",
        next: {
          selector:
            "VariableDeclaration, ExportNamedDeclaration[declaration.type='VariableDeclaration']",
          lineMode: "multiline",
        },
      },
      {
        blankLine: "always",
        prev: {
          selector:
            "VariableDeclaration, ExportNamedDeclaration[declaration.type='VariableDeclaration']",
          lineMode: "multiline",
        },
        next: "*",
      },
    ],
    "import/no-cycle": "error",
    "import/no-self-import": "error",
    "promise/no-multiple-resolved": "error",
    "promise/no-return-in-finally": "error",
    "promise/valid-params": "error",
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "error",
    "typescript/no-explicit-any": "error",
    "typescript/ban-ts-comment": [
      "error",
      {
        "ts-ignore": true,
        "ts-nocheck": true,
        "ts-expect-error": "allow-with-description",
      },
    ],
    "typescript/no-floating-promises": ["error", { ignoreVoid: false }],
    "typescript/no-misused-promises": "error",
    "typescript/no-unsafe-assignment": "error",
    "typescript/switch-exhaustiveness-check": [
      "error",
      { considerDefaultExhaustiveForUnions: false },
    ],
  },
  overrides: [
    {
      files: ["scripts/**/*.mjs"],
      rules: {
        "typescript/no-unsafe-assignment": "off",
      },
    },
  ],
  ignorePatterns: ["dist/**", "public/r/**", "registry.json", "registry/styles/**"],
  env: {
    builtin: true,
  },
});
