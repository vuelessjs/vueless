import path from "path";
import { statSync } from "fs";
import { readdir } from "node:fs/promises";

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

export function getDefaultConfigJson(fileContents) {
  const objectStartIndex = fileContents.indexOf("{");
  const objectString = fileContents.substring(objectStartIndex).replace("};", "}");

  // indirect eval
  return (0, eval)("(" + objectString + ")"); // Converting into JS object
}

export function merge(source = {}, target = {}) {
  for (const [key, val] of Object.entries(source)) {
    if (val !== null && typeof val === `object`) {
      target[key] ??= new val.__proto__.constructor();
      merge(val, target[key]);
    } else {
      target[key] = val;
    }
  }

  return target; // we're replacing in-situ, so this is more for chaining than anything else
}
