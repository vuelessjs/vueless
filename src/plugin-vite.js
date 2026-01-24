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
import { overrideComponents, restoreComponents } from "./utils/node/componentOverride.js";
import {
  getNuxtDirs,
  getVueDirs,
  getVuelessAppDirs,
  cacheMergedConfigs,
  autoImportUserConfigs,
} from "./utils/node/helper.js";
import {
  VUE_EXT,
  JAVASCRIPT_EXT,
  TYPESCRIPT_EXT,
  INTERNAL_ENV,
  NUXT_MODULE_ENV,
  VUELESS_LOCAL_DIR,
  VUELESS_PACKAGE_DIR,
  SRC_USER_COMPONENTS_DIR,
  VUELESS_USER_COMPONENTS_DIR,
  ICONS_VIRTUAL_MODULE_ID,
  RESOLVED_ICONS_VIRTUAL_MODULE_ID,
  DEFAULT_EXIT_CODE,
} from "./constants.js";

/* TailwindCSS Vite plugins. */
export const TailwindCSS = (options) => {
  return options?.postcss ? TailwindPostcss(options) : TailwindVite(options);
};

/* Automatically importing Vueless components on demand */
export const UnpluginComponents = (options) =>
  UnpluginVueComponents({
    dirs: [VUELESS_USER_COMPONENTS_DIR, SRC_USER_COMPONENTS_DIR],
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
  const { debug, env, include, basePath } = options;

  const isInternalEnv = env === INTERNAL_ENV;
  const isNuxtModuleEnv = env === NUXT_MODULE_ENV;

  const vuelessSrcDir = isInternalEnv ? VUELESS_LOCAL_DIR : VUELESS_PACKAGE_DIR;

  // Cache to store previous icon content for change detection
  const iconContentCache = new Map();

  const targetFiles = [
    ...(include || []),
    ...getVuelessAppDirs(),
    ...(isNuxtModuleEnv ? getNuxtDirs() : getVueDirs()),
  ];

  /* if server stopped by developer (Ctrl+C) */
  process.on("SIGINT", async () => {
    /* remove `.cache` folder in components and restore changes */
    await removeCustomPropTypes(vuelessSrcDir);
    await restoreComponents(vuelessSrcDir);

    /* remove cached icons */
    await removeIconsCache(basePath);

    /* clear tailwind safelist */
    await clearTailwindSafelist(debug);

    iconContentCache.clear();

    /* stop a command line process */
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
        include: isInternalEnv
          ? []
          : [
              "vueless",
              "vueless/types",
              "vueless/constants",
              "vueless/constants.js",
              "vueless/v.tooltip/vTooltip.ts",
              "vueless/v.click-outside/vClickOutside.ts",
            ],
      },
    }),

    configResolved: async (config) => {
      if (!isNuxtModuleEnv) {
        /* auto import user configs */
        await autoImportUserConfigs(basePath);

        /* merge and cache component configs. */
        await cacheMergedConfigs({ vuelessSrcDir, basePath });
      }

      /* override components with custom ones from .vueless/components */
      await overrideComponents({ vuelessSrcDir });

      /* set custom prop types */
      await setCustomPropTypes({ vuelessSrcDir, basePath });

      /* build web-types.json with delay for right custom props behavior */
      setTimeout(async () => {
        await buildWebTypes({ vuelessSrcDir, basePath });
      }, 2000);

      /* collect used in project colors for tailwind safelist */
      await createTailwindSafelist({ env, srcDir: vuelessSrcDir, targetFiles, basePath, debug });

      /* cache vueless built-in and project icons */
      await removeIconsCache(basePath);
      await createIconsCache({ env, targetFiles, basePath, debug });

      if (isNuxtModuleEnv) {
        await copyIconsCache(basePath);
      }

      /* suppress rollup warnings */
      const originalOnWarn = config.build.rollupOptions.onwarn;

      config.build.rollupOptions.onwarn = (warning, warn) => {
        // eslint-disable-next-line prettier/prettier
        if (warning.code === "SOURCEMAP_BROKEN" && warning.plugin === "@tailwindcss/vite:generate:build") return;
        originalOnWarn ? originalOnWarn(warning, warn) : warn(warning);
      };
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

      if (hasIconChanges && currentIconLines.length) {
        /* cache vueless built-in and project icons */
        await createIconsCache({ env, targetFiles: [file], basePath, debug });

        if (isNuxtModuleEnv) {
          await copyIconsCache(basePath);
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
      await removeIconsCache(basePath);
    },
  };
};
