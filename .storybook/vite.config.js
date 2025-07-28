import { defineConfig } from "vite";

// Plugins
import Vue from "@vitejs/plugin-vue";
import { Vueless, TailwindCSS } from "../src/plugin-vite";
import { INTERNAL_ENV } from "../src/constants.js";

export default defineConfig({
  plugins: [Vue(), TailwindCSS(), Vueless({ env: INTERNAL_ENV })],
  optimizeDeps: {
    include: [
      "cva",
      "tailwind-merge",
      "prettier2",
      "prettier2/parser-html",
      "@storybook/addon-docs/blocks",
      "storybook/theming/create",
      "storybook/internal/docs-tools",
      "@storybook/addon-themes",
      "@storybook/vue3-vite",
    ],
  },
});
