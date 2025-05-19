/**
 * The file has a `.js ` extension because it is a node script.
 * Please do not change the extension if you do not fully understand the consequences.
 */
import TailwindVite from "@tailwindcss/vite";
import TailwindPostcss from "@tailwindcss/postcss";
import UnpluginVueComponents from "unplugin-vue-components/vite";

import { loadSvg } from "./utils/node/loaderSvg.js";
import {
  cacheProjectIcons,
  removeIconsCache,
  copyIconsCache,
  generateIconExports,
  reloadServerOnIconsCacheUpdate,
} from "./utils/node/loaderIcon.js";
import { createTailwindSafelist, clearTailwindSafelist } from "./utils/node/tailwindSafelist.js";
import { componentResolver, directiveResolver } from "./utils/node/vuelessResolver.js";
import { setCustomPropTypes, removeCustomPropTypes } from "./utils/node/dynamicProps.js";
import { buildWebTypes } from "./utils/node/webTypes.js";
import { hideHiddenStories, showHiddenStories } from "./utils/node/dynamicStories.js";
import {
  getNuxtDirs,
  getVueDirs,
  getVuelessConfigDirs,
  cacheMergedConfigs,
} from "./utils/node/helper.js";

import {
  VUE_EXT,
  TYPESCRIPT_EXT,
  JAVASCRIPT_EXT,
  INTERNAL_ENV,
  STORYBOOK_ENV,
  NUXT_MODULE_ENV,
  DEFAULT_EXIT_CODE,
  ICONS_VIRTUAL_MODULE_ID,
  RESOLVED_ICONS_VIRTUAL_MODULE_ID,
} from "./constants.js";

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
  – Loads SVG images as a Vue component.
 */
export const Vueless = function (options = {}) {
  const { debug, env, include, mirrorCacheDir } = options;

  const isInternalEnv = env === INTERNAL_ENV;
  const isStorybookEnv = env === STORYBOOK_ENV;
  const isNuxtModuleEnv = env === NUXT_MODULE_ENV;

  const targetFiles = [
    ...(include || []),
    ...getVuelessConfigDirs(),
    ...(isNuxtModuleEnv ? getNuxtDirs() : getVueDirs()),
  ];

  /* if server stopped by developer (Ctrl+C) */
  process.on("SIGINT", async () => {
    if (isInternalEnv || isStorybookEnv) {
      await showHiddenStories(isInternalEnv);
      await removeCustomPropTypes(isInternalEnv);
    }

    /* remove cached icons */
    await removeIconsCache(mirrorCacheDir);

    /* clear tailwind safelist */
    await clearTailwindSafelist(debug);

    /* stop a command line process */
    process.exit(DEFAULT_EXIT_CODE);
  });

  /* cache vueless built-in and project icons */
  async function prepareIcons() {
    await removeIconsCache(mirrorCacheDir);
    await cacheProjectIcons({ env, debug, targetFiles });
    await copyIconsCache(mirrorCacheDir);
  }

  return {
    name: "vite-plugin-vue-vueless",
    enforce: "pre",

    config: () => ({
      define: {
        "process.env": {},
      },
      optimizeDeps: {
        include: [
          ...(isInternalEnv
            ? ["./src/directives/tooltip/vTooltip.ts"]
            : ["vueless/directives/tooltip/vTooltip.ts"]),
        ],
      },
    }),

    configResolved: async () => {
      await cacheMergedConfigs(env);

      if (isInternalEnv || isStorybookEnv) {
        await buildWebTypes();
        await showHiddenStories(isInternalEnv);
        await hideHiddenStories(isInternalEnv);
        await setCustomPropTypes(isInternalEnv);
      }

      await prepareIcons();

      if (!isNuxtModuleEnv) {
        /* collect used in project colors for tailwind safelist */
        await createTailwindSafelist({ env, debug, targetFiles });
      }
    },

    /* update icons cache in dev env */
    handleHotUpdate: async ({ file }) => {
      if ([JAVASCRIPT_EXT, TYPESCRIPT_EXT, VUE_EXT].some((extension) => file.endsWith(extension))) {
        await prepareIcons();
      }
    },

    /* handle icons virtual module resolving */
    resolveId: (id) => {
      if (id === ICONS_VIRTUAL_MODULE_ID) {
        return RESOLVED_ICONS_VIRTUAL_MODULE_ID;
      }
    },

    /* load SVG images as a Vue components */
    load: async (id) => {
      return id === RESOLVED_ICONS_VIRTUAL_MODULE_ID
        ? generateIconExports()
        : await loadSvg(id, options);
    },

    /**
     * reload vite server when cached icons updated,
     * to immediately show new icons in dev env.
     */
    configureServer: (server) => reloadServerOnIconsCacheUpdate(server),

    /* remove cached icons */
    buildEnd: async () => await removeIconsCache(mirrorCacheDir),
  };
};
