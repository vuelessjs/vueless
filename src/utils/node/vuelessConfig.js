import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { pathToFileURL } from "node:url";
import { defineConfig } from "cva";
import { merge } from "lodash-es";
import { extendTailwindMerge } from "tailwind-merge";

import { createGetMergedConfig } from "./mergeConfigs.js";
import { buildTSFile } from "./helper.js";
import {
  VUELESS_CACHE_DIR,
  VUELESS_CONFIG_FILE_NAME,
  TAILWIND_MERGE_EXTENSION,
  NESTED_COMPONENT_PATTERN_REG_EXP,
} from "../../constants.js";

export let vuelessConfig = {};

/**
 * Load Vueless config from the project root.
 * IIFE is used to prevent top level await issue.
 */
(async () => {
  vuelessConfig = await getVuelessConfig();
})();

/**
 * Retrieves the Vueless config from the project root.
 *
 * This method checks for the existence of a `vueless.config.{js,ts}` file in the project root.
 * If the file exists, it reads the config and returns it as an object.
 * @param {string} basePath - The application base path.
 *
 * @return {Promise<Object>} A promise that resolves to the Vueless configuration object.
 */
export async function getVuelessConfig(basePath = "") {
  const configPathJs = path.join(cwd(), basePath, `${VUELESS_CONFIG_FILE_NAME}.js`);
  const configPathTs = path.join(cwd(), basePath, `${VUELESS_CONFIG_FILE_NAME}.ts`);
  // eslint-disable-next-line prettier/prettier
  const configOutPath = path.join(cwd(), basePath, `${VUELESS_CACHE_DIR}/${VUELESS_CONFIG_FILE_NAME}.mjs`);

  if (!fs.existsSync(configPathJs) && !fs.existsSync(configPathTs)) {
    return {};
  }

  fs.existsSync(configPathJs) && (await buildTSFile(configPathJs, configOutPath));
  fs.existsSync(configPathTs) && (await buildTSFile(configPathTs, configOutPath));

  if (fs.existsSync(configOutPath)) {
    const module = await import(pathToFileURL(configOutPath));

    return module.default;
  }
}

/* Merge tailwind classes with removing duplicates. */
const twMerge = extendTailwindMerge(merge(TAILWIND_MERGE_EXTENSION, vuelessConfig.tailwindMerge));

/**
 * Export cx (class merge) method:
 * – extended with tailwind-merge
 * – remove all Vueless nested component names ({U...} strings) from the class list string.
 */
export const { cx } = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(NESTED_COMPONENT_PATTERN_REG_EXP, ""),
  },
});

/* Get merged config based on config merging strategy. */
export const getMergedConfig = createGetMergedConfig(cx);
