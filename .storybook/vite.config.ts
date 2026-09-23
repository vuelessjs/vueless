import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Plugins
import Vue from "@vitejs/plugin-vue";
/* Imported via a relative path (not the `vueless` alias) so Storybook's config
   loader can resolve them while the symlinked `vueless` package is bundled. */
import { Vueless, TailwindCSS } from "../src/plugin-vite.js";
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
