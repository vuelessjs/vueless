import globals from "globals";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import prettierEslintConfig from "@vue/eslint-config-prettier";

import pluginVue from "eslint-plugin-vue";
import pluginVitest from "@vitest/eslint-plugin";
import pluginStorybook from "eslint-plugin-storybook";

const languageOptions = {
  globals: {
    ...globals.node,
    ...globals.browser,
  },
  parserOptions: {
    module: "esnext",
    tsconfigRootDir: __dirname,
  },
};

export default defineConfigWithVueTs(
  {
    name: "global",
    files: ["**/*.{ts,vue}", "**/.storybook/**"],
    ignores: ["**/dist/**", "**/coverage/**", "**/storybook-static/**"],
    languageOptions,
  },
  pluginVue.configs["flat/recommended"],
  pluginStorybook.configs["flat/recommended"].map((item) => ({
    ...item,
    ...(item.name.includes("stories-rules") ? { files: ["**/stories.{js,ts}"] } : {}),
  })),
  vueTsConfigs.recommended,
  prettierEslintConfig,
  {
    name: "common",
    languageOptions,
    files: ["**/*.{js,ts,vue}"],
    rules: {
      "no-console": process.env.PROD ? "error" : "warn",
      "no-debugger": process.env.PROD ? "error" : "warn",
      "@typescript-eslint/no-unused-vars": process.env.PROD ? "error" : "warn",
      "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true, allowShortCircuit: true }],
      "arrow-parens": ["error", "always"],
      curly: ["error", "multi-line"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "directive", next: "*" },
        { blankLine: "any", prev: "directive", next: "directive" },
        { blankLine: "always", prev: "block-like", next: "*" },
        { blankLine: "always", prev: "*", next: "block-like" },
        { blankLine: "always", prev: "*", next: "return" },
      ],
      "prettier/prettier": ["warn", { printWidth: 100 }],
      "vue/max-len": ["error", { code: 120, template: 960, ignoreComments: true, ignoreUrls: true }],
      "vue/max-attributes-per-line": ["error", { singleline: { max: 9 }, multiline: { max: 1 } }],
    },
  },
  {
    name: "vueless-component-config",
    files: ["src/**/config.{js,ts}"],
    rules: {
      "vue/max-len": ["error", { code: 140 }],
      "prettier/prettier": ["warn", { printWidth: 130 }],
    },
  },
  {
    name: "vitest",
    ...pluginVitest.configs.recommended,
    files: ["src/**/tests/*"],
  },
  {
    name: "eslint",
    files: ["eslint.config.*"],
    rules: {
      "prettier/prettier": ["warn", { printWidth: 120 }],
    },
  },
);
