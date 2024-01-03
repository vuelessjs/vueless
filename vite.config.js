import { defineConfig } from "vite";
import path from "path";

/* Vite plugins */
import Vue from "@vitejs/plugin-vue";
import Yaml from "@modyfi/vite-plugin-yaml";
import Eslint from "vite-plugin-eslint";
import { viteRequire as Require } from "vite-require";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import VueSvgLoader from "vite-svg-loader";
import UnpluginVueComponents from "unplugin-vue-components/vite";

/* vueless configs and resolvers */
import monoVueI18Config from "./src/config.unplugin-vue-i18n";
import monoVueSvgLoaderConfig from "./src/config.vite-svg-loader";
import monoResolver from "./src/resolver.unplugin-vue-components";

/* Vite config */
export default defineConfig({
  plugins: [
    Vue(),
    Yaml(),
    Eslint(),
    Require(),
    VueI18n(monoVueI18Config),
    VueSvgLoader(monoVueSvgLoaderConfig),
    UnpluginVueComponents({
      resolvers: [monoResolver],
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      vueless: path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "lodash.clonedeep",
      "lodash.debounce",
      "lodash.pick",
      "idb-keyval",
      "vue-multiselect",
      "cleave.js",
      "@uppy/core",
      "@uppy/vue/src/drag-drop",
    ],
  },
});
