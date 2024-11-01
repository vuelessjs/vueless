import fs from "fs";
import path from "path";
import esbuild from "esbuild";

/**
 * Load Vueless config from the project root.
 * IIFE is used to prevent top level await issue.
 */
export let vuelessConfig = {};

(async () => {
  const configPathJs = path.join(process.cwd(), "/vueless.config.js");
  const configPathTs = path.join(process.cwd(), "/vueless.config.ts");
  const configOutPath = path.join(process.cwd(), "node_modules/.cache/vueless/vueless.config.mjs");

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
