import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/postcss";

// Plugins
import Vue from "@vitejs/plugin-vue";
import { Vueless } from "../src/plugin-vite";

export default defineConfig({
  plugins: [Vue(), Vueless({ mode: "storybook", env: "vueless", debug: false })],
  optimizeDeps: {
    include: [
      "cva",
      "tailwind-merge",
      "@tailwindcss/forms",
      "prettier2",
      "prettier2/parser-html",
      "@storybook/blocks",
      "@storybook/theming/create",
      "@storybook/addon-themes",
      "@storybook/addon-interactions/preview",
    ],
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
