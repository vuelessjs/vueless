import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { pathToFileURL } from "node:url";
import { defineConfig } from "cva";
import { createGetMergedConfig } from "./mergeConfigs.js";
import { merge } from "lodash-es";
import { extendTailwindMerge } from "tailwind-merge";

import { buildTSFile } from "./helper.js";
import {
  VUELESS_CACHE_DIR,
  VUELESS_CONFIG_FILE_NAME,
  TAILWIND_MERGE_EXTENSION,
  NESTED_COMPONENT_PATTERN_REG_EXP,
} from "../../constants.js";

/**
 * Load Vueless config from the project root.
 * IIFE is used to prevent top level await issue.
 */
export let vuelessConfig = {};

(async () => {
  const configPathJs = path.join(cwd(), `${VUELESS_CONFIG_FILE_NAME}.js`);
  const configPathTs = path.join(cwd(), `${VUELESS_CONFIG_FILE_NAME}.ts`);
  const configOutPath = path.join(cwd(), `${VUELESS_CACHE_DIR}/${VUELESS_CONFIG_FILE_NAME}.mjs`);

  if (!fs.existsSync(configPathJs) && !fs.existsSync(configPathTs)) {
    vuelessConfig = {};

    return;
  }

  fs.existsSync(configPathJs) && (await buildTSFile(configPathJs, configOutPath));
  fs.existsSync(configPathTs) && (await buildTSFile(configPathTs, configOutPath));

  if (fs.existsSync(configOutPath)) {
    const module = await import(pathToFileURL(configOutPath));

    vuelessConfig = module.default;
  }
})();

const twMerge = extendTailwindMerge(merge(TAILWIND_MERGE_EXTENSION, vuelessConfig.tailwindMerge));

export const { cx } = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(NESTED_COMPONENT_PATTERN_REG_EXP, ""),
  },
});

export const getMergedConfig = createGetMergedConfig(cx);
