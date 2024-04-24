import { defineConfig } from "vite";
import { resolve } from "path";
// Plugins
import Vue from "@vitejs/plugin-vue";
import Eslint from "vite-plugin-eslint";
import { Vueless, VuelessUnpluginComponents } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [
    Vue(),
    Eslint(),
    Vueless({ mode: "storybook", env: "vueless" }),
    VuelessUnpluginComponents(),
  ],
  resolve: {
    extensions: [".vue", ".mjs", ".js", ".ts", ".mdx"],
    alias: [
      {
        find: "vueless",
        replacement: resolve(__dirname, "./src"),
      },
      {
        find: "../web-types.json",
        replacement: resolve(__dirname, "./web-types.json"),
      },
      {
        find: "../../../vueless.config.js",
        replacement: resolve(__dirname, "./vueless.config.js"),
      },
    ],
  },
  optimizeDeps: {
    include: [
      "vuex",
      "vue-tippy",
      "@uppy/core",
      "@uppy/vue/src/drag-drop",
      "@kyvg/vue3-notification",
      "@tailwindcss/forms",
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
