import { defineConfig } from "vite";
import path from "path";

/* Vite plugins */
import Vue from "@vitejs/plugin-vue";
import Yaml from "@modyfi/vite-plugin-yaml";
import Eslint from "vite-plugin-eslint";
import { viteRequire as Require } from "vite-require";
import VueSvgLoader from "vite-svg-loader";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import UnpluginVueComponents from "unplugin-vue-components/vite";

/* vueless configs and resolvers */
//import viteSvgLoaderConfig from "./src/config.vite-svg-loader";
import vuelessResolver from "./src/core/resolver.unplugin-vue-components";
import monoVueI18Config from "./src/config.unplugin-vue-i18n";

/* Vite config */
export default defineConfig({
  plugins: [
    Vue(),
    Yaml(),
    Eslint(),
    Require(),
    VueI18n(monoVueI18Config),
    VueSvgLoader(),
    UnpluginVueComponents({
      resolvers: [vuelessResolver],
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".vue"],
    alias: {
      vueless: path.resolve(__dirname, "./src/core"),
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
      "vuex",
      "vue-router",
      "@kyvg/vue3-notification",
      "vue-i18n",
      "lodash.merge",
      "@storybook/theming/create",
      "@tailwindcss/forms",
      "tailwindcss/colors",
      "cva",
      "tailwind-merge",
      "react-dom/server",
      "html-entities",
      "prettier2",
      "prettier2/parser-html",
      "vue-tippy",
      "lodash.get",
    ],
  },
});
