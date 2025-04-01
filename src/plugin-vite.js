/**
 * The file has `.js` extension because it is a node script.
 * Please do not change the extension if you do not fully understand the consequences.
 */
import TailwindVite from "@tailwindcss/vite";
import TailwindPostcss from "@tailwindcss/postcss";
import UnpluginVueComponents from "unplugin-vue-components/vite";

import { loadSvg } from "./utils/node/loaderSvg.js";
import { cacheIcons, removeIconsCache, copyIconsCache } from "./utils/node/loaderIcon.js";
import { createTailwindSafelist, clearTailwindSafelist } from "./utils/node/tailwindSafelist.js";
import { getNuxtDirs, getVueDirs, getVuelessConfigDirs } from "./utils/node/helper.js";
import { componentResolver, directiveResolver } from "./utils/node/vuelessResolver.js";
import { setCustomPropTypes, removeCustomPropTypes } from "./utils/node/dynamicProps.js";
import { buildWebTypes } from "./utils/node/webTypes.js";
import { hideHiddenStories, showHiddenStories } from "./utils/node/dynamicStories.js";

import { DEFAULT_EXIT_CODE } from "./constants.js";

/* TailwindCSS Vite plugins. */
export const TailwindCSS = (options) => {
  return options?.postcss ? TailwindPostcss(options) : TailwindVite(options);
};

/* Automatically importing Vueless components on demand */
export const UnpluginComponents = (options) =>
  UnpluginVueComponents({
    resolvers: [componentResolver, directiveResolver],
    dts: true,
    ...options,
  });

/*
  – Creates tailwind colors safelist (collect only used on the project colors).
  – Collects SVG icons for build (UIcon bundle size optimization).
  – Loads SVG images as a Vue components.
 */
export const Vueless = function (options = {}) {
  const { mode, debug, env, include, mirrorCacheDir } = options;

  const isVuelessEnv = env === "vueless";
  const isNuxt = mode === "nuxt-module";

  const targetFiles = [
    ...(include || []),
    ...getVuelessConfigDirs(),
    ...(isNuxt ? getNuxtDirs() : getVueDirs()),
  ];

  /* if server stopped by developer (Ctrl+C) */
  process.on("SIGINT", async () => {
    await showHiddenStories(isVuelessEnv);

    await removeCustomPropTypes(isVuelessEnv);

    /* remove cached icons */
    await removeIconsCache(mirrorCacheDir, debug);

    /* clear tailwind safelist */
    clearTailwindSafelist(debug);

    /* stop command line process */
    process.exit(DEFAULT_EXIT_CODE);
  });

  return {
    name: "vite-plugin-vue-vueless",
    enforce: "pre",

    config: () => ({
      define: {
        "process.env": {},
      },
      optimizeDeps: {
        include: [
          ...(!isVuelessEnv
            ? ["vueless/directives/tooltip/vTooltip.ts"]
            : ["./src/directives/tooltip/vTooltip.ts"]),
        ],
      },
    }),

    configResolved: async () => {
      if (mode === "storybook" || isVuelessEnv) {
        await showHiddenStories(isVuelessEnv);
        await buildWebTypes();
        await hideHiddenStories(isVuelessEnv);
      }

      if (!isNuxt) {
        /* collect used in project colors for tailwind safelist */
        await createTailwindSafelist({ mode, env, debug, targetFiles });
      }

      await removeIconsCache(mirrorCacheDir, debug);

      /* cache vueless built-in and project icons */
      await cacheIcons({ mode: "vuelessIcons", env, debug, targetFiles });
      await cacheIcons({ mode, env, debug, targetFiles });

      await copyIconsCache(mirrorCacheDir, debug);

      await setCustomPropTypes(isVuelessEnv);
    },

    buildEnd: async () => {
      /* remove cached icons */
      await removeIconsCache(mirrorCacheDir, debug);
    },

    /* load SVG images as a Vue components */
    load: async (id) => await loadSvg(id, options),

    handleHotUpdate: async ({ file, read }) => {
      if (!isNuxt && [".js", ".jsx", ".ts", ".tsx", ".vue"].some((ext) => file.endsWith(ext))) {
        const fileContent = await read();

        if (fileContent.includes("safelist:") || fileContent.includes("color=")) {
          /* collect used in project colors for tailwind safelist */
          await createTailwindSafelist({ mode, env, debug, targetFiles });
        }
      }
    },
  };
};
