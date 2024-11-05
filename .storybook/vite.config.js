import { defineConfig } from "vite";

// Plugins
import Vue from "@vitejs/plugin-vue";
import { Vueless } from "../src/plugin-vite";

export default defineConfig({
  plugins: [Vue(), Vueless({ mode: "storybook", env: "vueless", debug: false })],
  optimizeDeps: {
    include: [
      "cva",
      "tailwind-merge",
      "prettier2",
      "prettier2/parser-html",
      "@storybook/blocks",
      "@storybook/theming/create",
      "@storybook/addon-themes",
    ],
  },
});
