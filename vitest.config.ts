import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";

import { Vueless, TailwindCSS } from "./src/plugin-vite";
import { INTERNAL_ENV } from "./src/constants.js";

export default defineConfig({
  plugins: [Vue(), Vueless({ env: INTERNAL_ENV }), TailwindCSS()],
  test: {
    environment: "jsdom",
  },
});
