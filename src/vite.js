/**
 * The file has `.js` extension because it is a node script.
 * Please do not change the extension if you do not fully understand the consequences.
 */

import UnpluginVueComponents from "unplugin-vue-components/vite";

import { loadSvg } from "./utils/node/loaderSvg.js";
import { copyIcons, removeIcons } from "./utils/node/loaderIcon.js";
import { createTailwindSafelist, clearTailwindSafelist } from "./utils/node/tailwindSafelist.js";
import { addWebTypesToPackageJson, getNuxtFiles, getVueSourceFile } from "./utils/node/helper.js";
import { componentResolver, directiveResolver } from "./utils/node/vuelessResolver.js";

/* Automatically importing Vueless components on demand */
export const VuelessUnpluginComponents = (options) =>
  UnpluginVueComponents({
    resolvers: [componentResolver, directiveResolver],
    dts: false,
    ...options,
  });

/*
  – Creates tailwind colors safelist (collect only used on the project colors).
  – Collects SVG icons for build (UIcon bundle size optimization).
  – Loads SVG images as a Vue components.
 */
export const Vueless = function (options = {}) {
  const { mode, debug, env, include } = options;

  const isNuxt = mode === "nuxt-module";
  const srcDir = isNuxt ? process.cwd() : getVueSourceFile();

  const targetFiles = [srcDir, ...(include || []), ...(isNuxt ? getNuxtFiles() : [])];

  /* if server stopped by developer (Ctrl+C) */
  process.on("SIGINT", async () => {
    /* remove dynamically copied icons */
    await removeIcons({ debug, isNuxt });

    /* clear tailwind safelist */
    clearTailwindSafelist(debug);
    process.exit(0);
  });

  return {
    name: "vite-plugin-vue-vueless",
    enforce: "pre",

    config: () => ({
      define: {
        "process.env": {},
      },
      optimizeDeps: {
        include: ["tailwindcss/colors.js"],
      },
    }),

    configResolved: async (config) => {
      /* collect used in project colors for tailwind safelist */
      if (!isNuxt) {
        await createTailwindSafelist({ mode, env, debug, targetFiles });
      }

      if (config.command === "build") {
        await removeIcons({ debug, isNuxt });

        /* dynamically copy used icons before build */
        await copyIcons({ mode: "vuelessIcons", env, debug, targetFiles });
        await copyIcons({ mode, env, debug, targetFiles, isNuxt });
      }

      if (config.command === "dev" || config.command === "serve") {
        /* remove dynamically copied icons on dev server start */
        await removeIcons({ debug, isNuxt });

        /* add web-types config to the package.json */
        addWebTypesToPackageJson(env, debug);
      }
    },

    /* remove dynamically copied icons after build */
    buildEnd: async () => {
      await removeIcons({ debug, isNuxt });
    },

    /* load SVG images as a Vue components */
    load: async (id) => await loadSvg(id, options),

    handleHotUpdate: async ({ file, read }) => {
      if (!isNuxt && [".js", ".ts", ".vue"].some((ext) => file.endsWith(ext))) {
        const fileContent = await read();

        if (fileContent.includes("safelist:") || fileContent.includes("color=")) {
          /* collect used in project colors for tailwind safelist */
          await createTailwindSafelist({ mode, env, debug, targetFiles });
        }
      }
    },
  };
};