/**
 * The file has a `.js ` extension because it is a node script.
 * Please do not change the extension if you do not fully understand the consequences.
 */
import path from "node:path";
import { watch } from "chokidar";
import { cwd } from "node:process";
import TailwindVite from "@tailwindcss/vite";
import TailwindPostcss from "@tailwindcss/postcss";
import UnpluginVueComponents from "unplugin-vue-components/vite";

import { loadSvg } from "./utils/node/loaderSvg.js";
import {
  createIconsCache,
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
  VUELESS_LOCAL_DIR,
  VUELESS_PACKAGE_DIR,
  ICONS_CACHED_DIR,
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

  const vuelessSrcDir = isInternalEnv ? VUELESS_LOCAL_DIR : VUELESS_PACKAGE_DIR;

  const iconsCachePath = path.join(cwd(), ICONS_CACHED_DIR);
  const iconsCacheWatcher = watch(iconsCachePath);

  const targetFiles = [
    ...(include || []),
    ...getVuelessConfigDirs(),
    ...(isNuxtModuleEnv ? getNuxtDirs() : getVueDirs()),
  ];

  /* if server stopped by developer (Ctrl+C) */
  process.on("SIGINT", async () => {
    if (isInternalEnv || isStorybookEnv) {
      await showHiddenStories(vuelessSrcDir);
      await removeCustomPropTypes(vuelessSrcDir);
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
    await createIconsCache({ env, debug, targetFiles });

    if (isNuxtModuleEnv) {
      await copyIconsCache(mirrorCacheDir);
    }
  }

  return {
    name: "vite-plugin-vue-vueless",
    enforce: "pre",

    config: () => ({
      define: {
        "process.env": {},
      },
      optimizeDeps: {
        include: ["vueless/directives/**/*.ts"],
      },
    }),

    configResolved: async () => {
      if (!isNuxtModuleEnv) {
        /* merge and cache component configs. */
        await cacheMergedConfigs(vuelessSrcDir);
      }

      if (isInternalEnv || isStorybookEnv) {
        await buildWebTypes(vuelessSrcDir);
        await showHiddenStories(vuelessSrcDir);
        await hideHiddenStories(vuelessSrcDir);
        await setCustomPropTypes(vuelessSrcDir);
      }

      /* collect used in project colors for tailwind safelist */
      await createTailwindSafelist({ env, srcDir: vuelessSrcDir, targetFiles, debug });

      /* cache vueless built-in and project icons */
      await prepareIcons();
    },

    /* update icons cache in dev env */
    handleHotUpdate: async ({ file }) => {
      if ([JAVASCRIPT_EXT, TYPESCRIPT_EXT, VUE_EXT].some((extension) => file.endsWith(extension))) {
        /* cache vueless built-in and project icons */
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
    configureServer: (server) => reloadServerOnIconsCacheUpdate(server, iconsCacheWatcher),

    /* remove cached icons */
    buildEnd: async () => {
      iconsCacheWatcher.close();
      await removeIconsCache(mirrorCacheDir);
    },
  };
};
