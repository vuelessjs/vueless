import { defineConfig } from "vite";

// Plugins
import Vue from "@vitejs/plugin-vue";
import Eslint from "vite-plugin-eslint";
import { Vueless } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [Vue(), Eslint(), Vueless({ mode: "storybook", env: "vueless" })],
  optimizeDeps: {
    include: [
      "cva",
      "tailwind-merge",
      "prettier2",
      "prettier2/parser-html",
      "tailwindcss/colors.js",
      "@storybook/blocks",
      "@storybook/theming/create",
    ],
  },
});
