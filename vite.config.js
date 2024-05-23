import { defineConfig } from "vite";
import path from "path";
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
    alias: {
      vueless: path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "vuex",
      "vue-tippy",
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
