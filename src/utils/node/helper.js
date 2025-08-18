import esbuild from "esbuild";
import path from "node:path";
import { cwd } from "node:process";
import { pathToFileURL } from "node:url";
import { existsSync, statSync } from "node:fs";
import { mkdir, readdir, rmdir, readFile, writeFile } from "node:fs/promises";

import { vuelessConfig, getMergedConfig } from "./vuelessConfig.js";

import {
  COMPONENTS,
  JAVASCRIPT_EXT,
  TYPESCRIPT_EXT,
  SUPPRESS_TS_CHECK,
  VUELESS_CONFIG_DIR,
  COMPONENTS_INDEX_EXPORT,
  COMPONENTS_INDEX_COMMENT,
  VUELESS_CONFIGS_CACHED_DIR,
  VUELESS_MERGED_CONFIGS_CACHED_DIR,
  CONFIG_INDEX_FILE_NAME,
} from "../../constants.js";

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
    path.join(cwd(), "app"),
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
  return [path.join(cwd(), VUELESS_CONFIG_DIR)];
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

export async function removeFolderIfEmpty(dirPath) {
  if (existsSync(dirPath)) {
    const files = await readdir(dirPath);

    if (!files.length) {
      await rmdir(dirPath);
    }
  }
}

/**
 * Detects if TypeScript is a dependency in the project's package.json
 * @returns {Promise<boolean>} True if TypeScript is found in dependencies or devDependencies
 */
export async function detectTypeScript() {
  try {
    const packageJsonPath = path.join(cwd(), "package.json");
    const packageJsonContent = await readFile(packageJsonPath, "utf-8");
    const pkg = JSON.parse(packageJsonContent);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    return Boolean(deps.typescript);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
}

export async function autoImportUserConfigs(rootDir = "") {
  console.log("desc >>>>>>>>>>>>>>>>");

  const vuelessConfigDir = path.join(cwd(), rootDir, VUELESS_CONFIG_DIR);

  const indexTsPath = path.join(vuelessConfigDir, `${CONFIG_INDEX_FILE_NAME}${TYPESCRIPT_EXT}`);
  const indexJsPath = path.join(vuelessConfigDir, `${CONFIG_INDEX_FILE_NAME}${JAVASCRIPT_EXT}`);

  const hasTypeScript = detectTypeScript();

  const indexFilePath = hasTypeScript ? indexTsPath : indexJsPath;
  const fileExt = hasTypeScript ? TYPESCRIPT_EXT : JAVASCRIPT_EXT;

  const configFiles = await getDirFiles(vuelessConfigDir, fileExt, {
    recursive: true,
    exclude: [
      `${CONFIG_INDEX_FILE_NAME}${TYPESCRIPT_EXT}`,
      `${CONFIG_INDEX_FILE_NAME}${JAVASCRIPT_EXT}`,
    ],
  });

  const componentConfigFiles = configFiles.filter((filePath) => {
    const fileName = path.basename(filePath);

    return /^U\w+\.(ts|js)$/.test(fileName);
  });

  const imports = [];
  const componentEntries = [];

  if (componentConfigFiles.length) {
    for (const configFilePath of componentConfigFiles) {
      const fileName = path.basename(configFilePath, path.extname(configFilePath));
      const relativePath = path.relative(vuelessConfigDir, configFilePath);
      const importPath = "./" + relativePath.replace(/\\/g, "/");

      imports.push(`import ${fileName} from "${importPath}";`);
      componentEntries.push(`  ${fileName},`);
    }
  }

  if (!existsSync(vuelessConfigDir)) {
    await mkdir(vuelessConfigDir, { recursive: true });
  }

  await writeFile(indexFilePath, generateConfigIndexContent(imports, componentEntries), "utf-8");
}

export function generateConfigIndexContent(imports = [], componentEntries = []) {
  const importsSection = imports.length ? `\n${imports.join("\n")}\n\n` : "";
  const entriesSection = componentEntries.length ? `\n${componentEntries.join("\n")}\n` : "";

  const hasTypeScript = detectTypeScript();
  const suppressTsCheck = hasTypeScript ? `${SUPPRESS_TS_CHECK}\n` : "";

  return `${suppressTsCheck}${COMPONENTS_INDEX_COMMENT}\n${importsSection}${COMPONENTS_INDEX_EXPORT.replace(
    "{}",
    `{${entriesSection}}`,
  )}
`;
}
