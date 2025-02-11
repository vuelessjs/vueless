import esbuild from "esbuild";
import path from "node:path";
import { cwd } from "node:process";
import { statSync, existsSync, promises as fsPromises } from "node:fs";

import { VUELESS_CONFIGS_CACHED_DIR } from "../../constants.js";

export async function getDirFiles(dirPath, ext, { recursive = true, exclude = [] } = {}) {
  let fileNames = [];

  const ERROR_CODE = {
    dirIsFile: "ENOTDIR",
    noEntry: "ENOENT",
  };

  try {
    fileNames = await fsPromises.readdir(dirPath, { recursive });
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

export function getNuxtDirs() {
  return [
    path.join(cwd(), "composables"),
    path.join(cwd(), "components"),
    path.join(cwd(), "layouts"),
    path.join(cwd(), "pages"),
    path.join(cwd(), "plugins"),
    path.join(cwd(), "utils"),
    path.join(cwd(), "Error.vue"),
    path.join(cwd(), "App.vue"),
    path.join(cwd(), "Error.vue"),
    path.join(cwd(), "app.vue"),
    path.join(cwd(), "error.vue"),
    path.join(cwd(), "playground", "app.vue"),
  ];
}

export function getVueDirs() {
  return [path.join(cwd(), "src")];
}

export function getVuelessConfigDirs() {
  return [path.join(cwd(), ".vueless")];
}

export async function getComponentDefaultConfig(name, entryPath) {
  const configOutPath = path.join(cwd(), `${VUELESS_CONFIGS_CACHED_DIR}/${name}.mjs`);

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
