import fs from "node:fs";
import path from "node:path";
import esbuild from "esbuild";

import { CACHE_PATH, VUELESS_CONFIG_FILE_NAME } from "../../constants.js";

/**
 * Load Vueless config from the project root.
 * IIFE is used to prevent top level await issue.
 */
export let vuelessConfig = {};

(async () => {
  const configPathJs = path.join(process.cwd(), `${VUELESS_CONFIG_FILE_NAME}.js`);
  const configPathTs = path.join(process.cwd(), `${VUELESS_CONFIG_FILE_NAME}.ts`);
  const configOutPath = path.join(process.cwd(), `${CACHE_PATH}/${VUELESS_CONFIG_FILE_NAME}.mjs`);

  if (!fs.existsSync(configPathJs) && !fs.existsSync(configPathTs)) {
    vuelessConfig = {};

    return;
  }

  fs.existsSync(configPathJs) && (await buildConfig(configPathJs, configOutPath));
  fs.existsSync(configPathTs) && (await buildConfig(configPathTs, configOutPath));

  vuelessConfig = (await import(configOutPath)).default;
})();

async function buildConfig(entryPath, configOutFile) {
  await esbuild.build({
    entryPoints: [entryPath],
    outfile: configOutFile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "ESNext",
    loader: { ".ts": "ts" },
  });
}
