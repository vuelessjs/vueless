module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  plugins: ["tailwindcss"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/prettier",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "no-console": process.env.PROD ? "error" : "warn",
    "no-debugger": process.env.PROD ? "error" : "warn",
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
    "vue/multi-word-component-names": [
      "error",
      { ignores: ["index", "Component", "Modal", "Page"] },
    ],
    "vue/max-len": ["error", { code: 120, template: 960, ignoreComments: true, ignoreUrls: true }],
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/v-on-event-hyphenation": ["error", "never"],
    "vue/no-v-html": "off",
    "tailwindcss/no-custom-classname": "off",
    "prettier/prettier": ["warn", { printWidth: 100, tabWidth: 2 }],
  },
  overrides: [
    {
      files: [".storybook/preview.{js,ts}"],
      rules: {
        "vue/max-len": ["error", { code: 280 }],
        "prettier/prettier": ["warn", { printWidth: 280, tabWidth: 2 }],
      },
    },
    {
      files: ["**/*.{stories}.{js,ts,jsx,tsx}"],
      extends: ["plugin:storybook/recommended"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    module: "esnext",
  },
  globals: {
    cy: true,
    Cypress: true,
  },
};
