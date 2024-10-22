import globals from "globals";
import eslintJs from "@eslint/js";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import prettierEslintConfig from "@vue/eslint-config-prettier";

import pluginVue from "eslint-plugin-vue";
import pluginVitest from "@vitest/eslint-plugin";
import pluginStorybook from "eslint-plugin-storybook";
import pluginTailwind from "eslint-plugin-tailwindcss";

const languageOptions = {
  globals: {
    ...globals.node,
    ...globals.browser,
  },
  // TODO: mayme it may be safety removed soon.
  // ecmaVersion: "latest",
  // sourceType: "commonjs",
  // parserOptions: {
  //   module: "esnext",
  // },
};

const jsConfig = {
  name: "javaScript",
  files: ["**/*.{js,mjs,cjs}"],
  rules: {
    ...eslintJs.configs.recommended.rules,
  },
};

const commonConfig = {
  name: "common",
  languageOptions,
  files: ["**/*.{js,ts,mjs,cjs,vue}"],
  rules: {
    "no-console": process.env.PROD ? "error" : "warn",
    "no-debugger": process.env.PROD ? "error" : "warn",
    "no-unused-vars": process.env.PROD ? "error" : "warn",
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
    "tailwindcss/no-custom-classname": "off",
    "prettier/prettier": ["warn", { printWidth: 120 }],
  },
};

const vueConfig = {
  name: "vue",
  files: ["**/*.vue"],
  rules: {
    "vue/max-len": ["error", { code: 120, template: 960, ignoreComments: true, ignoreUrls: true }],
    "vue/max-attributes-per-line": ["error", { singleline: { max: 9 }, multiline: { max: 1 } }],
    "vue/block-lang": ["error", { script: { lang: "ts" } }], // todo: remove later
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/no-v-html": "off",
  },
};

const vuelessConfigsConfig = {
  name: "vuelessConfig",
  files: ["src/**/config.{js,ts}"],
  rules: {
    "vue/max-len": ["error", { code: 140 }],
    "prettier/prettier": ["warn", { printWidth: 130 }],
  },
};

const vitestConfig = {
  name: "vitest",
  ...pluginVitest.configs.recommended,
  files: ["src/**/__tests__/*"],
};

const eslintConfig = {
  name: "eslint",
  files: ["eslint.config.*"],
  rules: {
    "prettier/prettier": ["warn", { printWidth: 120 }],
  },
};

export default [
  {
    name: "global",
    files: ["**/*.{ts,mts,vue}"],
    ignores: ["**/dist/**", "**/coverage/**", "**/storybook-static/**", "**/!.storybook/**"],
    languageOptions,
  },
  ...pluginVue.configs["flat/recommended"],
  ...pluginTailwind.configs["flat/recommended"],
  ...pluginStorybook.configs["flat/recommended"].map((item) => ({
    ...item,
    ...(item.name.includes("stories-rules") ? { files: ["**/stories.{js,ts,jsx,tsx,mjs,cjs}"] } : {}),
  })),
  ...vueTsEslintConfig({ supportedScriptLangs: { js: true } }),
  prettierEslintConfig,
  jsConfig,
  commonConfig,
  vueConfig,
  vuelessConfigsConfig,
  vitestConfig,
  eslintConfig,
];
