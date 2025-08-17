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
 *
 * @return {Promise<Object>} A promise that resolves to the Vueless configuration object.
 */
export async function getVuelessConfig() {
  const configPathJs = path.join(cwd(), `${VUELESS_CONFIG_FILE_NAME}.js`);
  const configPathTs = path.join(cwd(), `${VUELESS_CONFIG_FILE_NAME}.ts`);
  const configOutPath = path.join(cwd(), `${VUELESS_CACHE_DIR}/${VUELESS_CONFIG_FILE_NAME}.mjs`);

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

const twMerge = extendTailwindMerge(merge(TAILWIND_MERGE_EXTENSION, vuelessConfig.tailwindMerge));

export const { cx } = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(NESTED_COMPONENT_PATTERN_REG_EXP, ""),
  },
});

export const getMergedConfig = createGetMergedConfig(cx);
