import { defineConfig } from "vite";

// Plugins
import Vue from "@vitejs/plugin-vue";
import Eslint from "vite-plugin-eslint";
import { Vueless } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [Vue(), Eslint(), Vueless({ mode: "storybook", env: "vueless" })],
  resolve: {
    extensions: [".vue", ".mjs", ".js", ".ts", ".mdx"],
  },
  optimizeDeps: {
    include: [
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
