import path from "path";
import { statSync, existsSync } from "fs";
import { readdir } from "node:fs/promises";
import esbuild from "esbuild";

import { VUELESS_CONFIGS_CACHED_DIR } from "../../constants.js";

export async function getDirFiles(dirPath, ext, { recursive = true, exclude = [] } = {}) {
  let fileNames = [];

  const ERROR_CODE = {
    dirIsFile: "ENOTDIR",
    noEntry: "ENOENT",
  };

  try {
    fileNames = await readdir(dirPath, { recursive });
  } catch (error) {
    if (error.code === ERROR_CODE.dirIsFile) {
      const pathArray = dirPath.split(path.sep);
      const fileName = pathArray.pop();

      fileNames = [fileName];
      dirPath = pathArray.join(path.sep);
    }

    if (error.code === ERROR_CODE.noEntry) {
      fileNames = [];
    }

    if (!Object.values(ERROR_CODE).includes(error.code)) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  const excludeDirs = exclude.filter((excludeItem) => !excludeItem.startsWith("."));
  const excludeExts = exclude.filter((excludeItem) => excludeItem.startsWith("."));

  const filteredFiles = fileNames.filter((fileName) => {
    const isRightExt =
      fileName.endsWith(ext) && !excludeExts.some((excludeExt) => fileName.endsWith(excludeExt));
    const isExcludeDir = excludeDirs.some((excludeDir) => fileName.includes(excludeDir));

    return isRightExt && !isExcludeDir;
  });

  return filteredFiles
    .map((fileName) => path.join(dirPath, fileName))
    .filter((filePath) => !statSync(filePath).isDirectory());
}

export function getNuxtFiles() {
  return [
    path.join(process.cwd(), "composables"),
    path.join(process.cwd(), "components"),
    path.join(process.cwd(), "layouts"),
    path.join(process.cwd(), "pages"),
    path.join(process.cwd(), "plugins"),
    path.join(process.cwd(), "utils"),
    path.join(process.cwd(), "Error.vue"),
    path.join(process.cwd(), "App.vue"),
    path.join(process.cwd(), "Error.vue"),
    path.join(process.cwd(), "app.vue"),
    path.join(process.cwd(), "error.vue"),
    path.join(process.cwd(), "playground", "app.vue"),
  ];
}

export function getVueFiles() {
  return [path.join(process.cwd(), "src")];
}

export async function getComponentDefaultConfig(name, entryPath) {
  const configOutPath = path.join(process.cwd(), `${VUELESS_CONFIGS_CACHED_DIR}/${name}.mjs`);

  await buildTSFile(entryPath, configOutPath);

  if (existsSync(configOutPath)) {
    return (await import(configOutPath)).default;
  }
}

export async function buildTSFile(entryPath, configOutFile) {
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
