import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";

/* @ts-expect-error: TypeScript cannot find the declaration. */
import { INTERNAL_ENV } from "./src/constants.js";
import { Vueless, TailwindCSS } from "./src/plugin-vite";

export default defineConfig({
  plugins: [Vue(), Vueless({ env: INTERNAL_ENV }), TailwindCSS()],
  test: {
    environment: "jsdom",
  },
});
