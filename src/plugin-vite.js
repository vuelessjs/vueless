/**
 * The file has a `.js ` extension because it is a node script.
 * Please do not change the extension if you do not fully understand the consequences.
 */
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
  extractIconLines,
  isIconChanged,
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
  INTERNAL_ENV,
  STORYBOOK_ENV,
  NUXT_MODULE_ENV,
  VUELESS_LOCAL_DIR,
  VUELESS_PACKAGE_DIR,
  ICONS_VIRTUAL_MODULE_ID,
  RESOLVED_ICONS_VIRTUAL_MODULE_ID,
  DEFAULT_EXIT_CODE,
  JAVASCRIPT_EXT,
  TYPESCRIPT_EXT,
  VUE_EXT,
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

  // Cache to store previous icon content for change detection
  const iconContentCache = new Map();

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

    iconContentCache.clear();

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
    handleHotUpdate: async ({ file, server, read }) => {
      const isScriptFile = [JAVASCRIPT_EXT, TYPESCRIPT_EXT, VUE_EXT].some((extension) =>
        file.endsWith(extension),
      );

      if (!isScriptFile) {
        return;
      }

      const currentContent = await read();

      const currentIconLines = extractIconLines(currentContent);
      const previousIconLines = iconContentCache.get(file) || [];
      const hasIconChanges = isIconChanged(currentIconLines, previousIconLines);

      iconContentCache.set(file, currentIconLines);

      if (hasIconChanges && currentIconLines.length > 0) {
        /* cache vueless built-in and project icons */
        await createIconsCache({ env, debug, targetFiles: [file] });

        if (isNuxtModuleEnv) {
          await copyIconsCache(mirrorCacheDir);
        }

        reloadServerOnIconsCacheUpdate(server);

        return [];
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
      if (id === RESOLVED_ICONS_VIRTUAL_MODULE_ID) {
        return generateIconExports();
      }

      return await loadSvg(id, options);
    },

    /* remove cached icons */
    buildEnd: async () => {
      await removeIconsCache(mirrorCacheDir);
    },
  };
};
