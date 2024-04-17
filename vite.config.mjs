import { defineConfig } from "vite";
import path from "path";

import Vue from "@vitejs/plugin-vue";
import Eslint from "vite-plugin-eslint";
import { Vueless, VuelessUnpluginComponents } from "@vueless/vite-plugin";

export default defineConfig({
  plugins: [
    Vue(),
    Eslint(),
    Vueless(),
    VuelessUnpluginComponents(),
  ],
  resolve: {
    extensions: [".vue", ".mjs", ".js", ".ts", ".mdx"],
    alias: {
      "vueless/src": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "vuex",
      "vue-i18n",
      "vue-router",
      "vue-tippy",
      "@uppy/core",
      "@uppy/vue/src/drag-drop",
      //"@kyvg/vue3-notification",
      //"@tailwindcss/forms",
      "tailwindcss/colors.js",
      "cva",
      "tailwind-merge",
      "prettier2",
      "prettier2/parser-html",
      "@storybook/blocks",
      "@storybook/theming/create",
    ],
  },
});
