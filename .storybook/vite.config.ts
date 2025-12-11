import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Plugins
import Vue from "@vitejs/plugin-vue";
import { Vueless, TailwindCSS } from "vueless/plugin-vite.js";
import { INTERNAL_ENV } from "vueless/constants.js";

export default defineConfig({
  plugins: [Vue(), TailwindCSS(), Vueless({ env: INTERNAL_ENV })],
  optimizeDeps: {
    include: [
      "cva",
      "tailwind-merge",
      "prettier2",
      "prettier2/parser-html",
      "@storybook/addon-docs/blocks",
      "storybook/theming",
      "storybook/internal/docs-tools",
      "@storybook/addon-themes",
      "@storybook/vue3-vite",
      "@vueless/storybook",
    ],
  },
  resolve: {
    alias: {
      /* this resolves the `storyDarkModeDecorator` issue */
      vueless: resolve(__dirname, "../src"),
    },
  },
});
