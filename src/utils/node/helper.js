import esbuild from "esbuild";
import path from "node:path";
import { cwd } from "node:process";
import { pathToFileURL } from "node:url";
import { existsSync, statSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";

import { vuelessConfig, getMergedConfig } from "./vuelessConfig.js";

import {
  COMPONENTS,
  VUELESS_CONFIGS_CACHED_DIR,
  VUELESS_USER_CONFIGS_CACHED_DIR,
  VUELESS_MERGED_CONFIGS_CACHED_DIR,
} from "../../constants.js";

import {
  SUPPRESS_TS_CHECK,
  COMPONENTS_INDEX_EXPORT,
  COMPONENTS_INDEX_COMMENT,
} from "../../bin/constants.js";

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
  ];
}

export function getVueDirs() {
  return [path.join(cwd(), "src")];
}

export function getVuelessConfigDirs() {
  return [path.join(cwd(), ".vueless")];
}

export async function getMergedComponentConfig(name) {
  const configOutPath = path.join(cwd(), `${VUELESS_MERGED_CONFIGS_CACHED_DIR}/${name}.json`);

  if (existsSync(configOutPath)) {
    const raw = await readFile(configOutPath, "utf-8");

    return JSON.parse(raw);
  }
}

export async function getDefaultComponentConfig(name, configDir) {
  const configOutPath = path.join(cwd(), `${VUELESS_CONFIGS_CACHED_DIR}/${name}.mjs`);
  let config = {};

  if (configDir) {
    await buildTSFile(path.join(cwd(), configDir), configOutPath);
  }

  if (existsSync(configOutPath)) {
    const module = await import(pathToFileURL(configOutPath));

    config = module.default;
  }

  return config;
}

export async function cacheMergedConfigs(srcDir) {
  const componentNames = Object.entries(COMPONENTS);

  for await (const [componentName, componentDir] of componentNames) {
    const defaultComponentConfigPath = path.join(srcDir, componentDir, "config.ts");

    const defaultConfig = await getDefaultComponentConfig(
      componentName,
      defaultComponentConfigPath,
    );

    const destDirPath = path.join(cwd(), VUELESS_MERGED_CONFIGS_CACHED_DIR);
    const configDistPath = path.join(destDirPath, `${componentName}.json`);

    const mergedConfig = getMergedConfig({
      defaultConfig: defaultConfig,
      globalConfig: vuelessConfig.components?.[componentName] || {},
      unstyled: Boolean(vuelessConfig.unstyled),
    });

    if (!existsSync(destDirPath)) {
      await mkdir(destDirPath, { recursive: true });
    }

    await writeFile(configDistPath, JSON.stringify(mergedConfig));
  }
}

export async function cacheUserConfigs() {
  const vuelessConfigDir = path.join(cwd(), ".vueless");
  const destDirPath = path.join(cwd(), VUELESS_USER_CONFIGS_CACHED_DIR);

  const configFiles = await getDirFiles(vuelessConfigDir, ".ts", {
    recursive: true,
    exclude: [],
  });

  const jsConfigFiles = await getDirFiles(vuelessConfigDir, ".js", {
    recursive: true,
    exclude: [],
  });

  const allConfigFiles = [...configFiles, ...jsConfigFiles];

  const componentConfigFiles = allConfigFiles.filter((filePath) => {
    const fileName = path.basename(filePath);

    return fileName.match(/^U\w+\.config\.(ts|js)$/);
  });

  if (componentConfigFiles.length === 0) {
    return;
  }

  if (!existsSync(destDirPath)) {
    await mkdir(destDirPath, { recursive: true });
  }

  for (const configFilePath of componentConfigFiles) {
    const fileName = path.basename(configFilePath, path.extname(configFilePath));
    const componentName = fileName.replace(".config", "");
    const outputPath = path.join(destDirPath, `${componentName}.mjs`);

    try {
      await buildTSFile(configFilePath, outputPath);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to build config file ${configFilePath}:`, error);
    }
  }

  await autoImportUserConfigs();
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

export async function autoImportUserConfigs() {
  const vuelessConfigDir = path.join(cwd(), ".vueless");

  const indexTsPath = path.join(vuelessConfigDir, "index.ts");
  const indexJsPath = path.join(vuelessConfigDir, "index.js");
  const hasTsIndex = existsSync(indexTsPath);

  const indexFilePath = hasTsIndex ? indexTsPath : indexJsPath;

  const configFiles = await getDirFiles(vuelessConfigDir, ".ts", {
    recursive: true,
    exclude: ["index.ts", "index.js"],
  });

  const componentConfigFiles = configFiles.filter((filePath) => {
    const fileName = path.basename(filePath);

    return /^U\w+\.config\.(ts|js)$/.test(fileName);
  });

  if (componentConfigFiles.length === 0) {
    if (!existsSync(vuelessConfigDir)) {
      await mkdir(vuelessConfigDir, { recursive: true });
    }

    await writeFile(indexFilePath, generateConfigIndexContent(), "utf-8");

    return;
  }

  const imports = [];
  const componentEntries = [];

  for (const configFilePath of componentConfigFiles) {
    const fileName = path.basename(configFilePath, path.extname(configFilePath));
    const componentName = fileName.replace(".config", "");
    const relativePath = path.relative(vuelessConfigDir, configFilePath);
    const importPath = "./" + relativePath.replace(/\\/g, "/");

    imports.push(`import ${componentName} from "${importPath}";`);
    componentEntries.push(`  ${componentName},`);
  }

  const indexContent = generateConfigIndexContent(imports, componentEntries, hasTsIndex);

  if (!existsSync(vuelessConfigDir)) {
    await mkdir(vuelessConfigDir, { recursive: true });
  }

  await writeFile(indexFilePath, indexContent, "utf-8");
}

function generateConfigIndexContent(imports = [], componentEntries = [], isTypeScript) {
  const importsSection = imports.length ? `\n${imports.join("\n")}\n\n` : "";
  const entriesSection = componentEntries.length ? `\n${componentEntries.join("\n")}\n` : "";
  const suppressTsCheck = isTypeScript ? `${SUPPRESS_TS_CHECK}\n` : "";

  return `${suppressTsCheck}${COMPONENTS_INDEX_COMMENT}${importsSection}${COMPONENTS_INDEX_EXPORT.replace(
    "{}",
    `{${entriesSection}}`,
  )}
`;
}
