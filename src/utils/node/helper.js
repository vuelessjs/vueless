import esbuild from "esbuild";
import path from "node:path";
import { cwd } from "node:process";
import { pathToFileURL } from "node:url";
import { existsSync, statSync } from "node:fs";
import { mkdir, readdir, rmdir, readFile, writeFile } from "node:fs/promises";

import { getMergedConfig, getVuelessConfig } from "./vuelessConfig.js";

import {
  COMPONENTS,
  JAVASCRIPT_EXT,
  TYPESCRIPT_EXT,
  SUPPRESS_TS_CHECK,
  VUELESS_APP_DIR,
  VUELESS_APP_CONFIGS_DIR,
  COMPONENTS_INDEX_EXPORT,
  COMPONENTS_INDEX_COMMENT,
  VUELESS_CONFIGS_CACHED_DIR,
  VUELESS_MERGED_CONFIGS_CACHED_DIR,
  CONFIG_INDEX_FILE_NAME,
} from "../../constants.js";

/**
 * Retrieves a list of file names in a specified directory that match the given extension and filtering criteria.
 *
 * @param {string} dirPath - The path of the directory to search for files.
 * @param {string} ext - The extension of the files to include in the result.
 * @param {Object} [options] - Optional settings to customize the file search.
 * @param {boolean} [options.recursive=true] - Whether to search directories recursively.
 * @param {string[]} [options.exclude=[]] - A list of file or directory names to exclude from the result.
 * @return {Promise<string[]>} - A promise that resolves to an array of file paths that match the specified criteria.
 */
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

/**
 * Retrieves an array of directory paths and specific file paths within the current working directory related to a Nuxt.js project.
 * @return {string[]}.
 */
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

/**
 * Retrieves an array of directory paths and specific file paths within the current working directory related to a Vue.js project.
 * @return {string[]}.
 */
export function getVueDirs() {
  return [path.join(cwd(), "src")];
}

/**
 * Retrieves an array of directory paths and specific file paths within the current working directory related to a Vueless project.
 * @return {string[]}.
 */
export function getVuelessAppDirs() {
  return [path.join(cwd(), VUELESS_APP_DIR)];
}

/**
 * Retrieves the merged config for a specific component.
 *
 * @param {string} name - The name of the component.
 * @return {Promise<Object>} A promise that resolves to the merged configuration object for the specified component.
 */
export async function getMergedComponentConfig(name) {
  const configOutPath = path.join(cwd(), `${VUELESS_MERGED_CONFIGS_CACHED_DIR}/${name}.json`);

  if (existsSync(configOutPath)) {
    const raw = await readFile(configOutPath, "utf-8");

    return JSON.parse(raw);
  }
}

/**
 * Retrieves the default config for a specific component.
 *
 * @param {string} name - The name of the component.
 * @param {string} configDir - The directory path where the component's configuration file is located.
 * @return {Promise<Object>} A promise that resolves to the default configuration object for the specified component.
 */
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

/**
 * Caches merged configs for all components.
 *
 * @param {Object} options - Configuration options.
 * @param {string} options.vuelessSrcDir - The source directory for Vueless components.
 * @param {string} options.basePath - The base path for retrieving the Vueless configuration file.
 * @return {Promise<void>} A promise that resolves when all merged configs have been cached.
 */
export async function cacheMergedConfigs({ vuelessSrcDir, basePath } = {}) {
  const vuelessConfig = await getVuelessConfig(basePath);
  const componentNames = Object.entries(COMPONENTS);

  for await (const [componentName, componentDir] of componentNames) {
    const defaultComponentConfigPath = path.join(vuelessSrcDir, componentDir, "config.ts");

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

/**
 * Builds a TypeScript file into a JavaScript file using esbuild.
 *
 * @param {string} entryPath - The path to the TypeScript file to be built.
 * @param {string} configOutFile - The output path for the resulting JavaScript file.
 * @return {Promise<void>} A promise that resolves when the build is complete.
 */
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

/**
 * Removes a folder if it is empty.
 * @param {string} dirPath - The path to the directory to be removed.
 * @return {Promise<void>} A promise that resolves when the directory has been removed.
 */
export async function removeFolderIfEmpty(dirPath) {
  try {
    const files = await readdir(dirPath);

    if (!files.length) {
      await rmdir(dirPath, { recursive: false, force: true });
    }
  } catch {
    // suppress errors
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

/**
 * Automatically imports user configuration files from a specified directory, generates index file entries for them,
 * and writes the configuration index file in the appropriate format (TypeScript or JavaScript).
 *
 * @param {string} [basePath=""] The base directory path where the user configuration files are located.
 * @return {Promise<void>} A promise that resolves when the configuration import and index file generation is completed.
 */
export async function autoImportUserConfigs(basePath = "") {
  const vuelessConfigDir = path.join(cwd(), basePath, VUELESS_APP_CONFIGS_DIR);

  const indexTsPath = path.join(vuelessConfigDir, `${CONFIG_INDEX_FILE_NAME}${TYPESCRIPT_EXT}`);
  const indexJsPath = path.join(vuelessConfigDir, `${CONFIG_INDEX_FILE_NAME}${JAVASCRIPT_EXT}`);

  const hasTypeScript = await detectTypeScript();

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

  const indexFileContent = await generateConfigIndexContent(imports, componentEntries);

  await writeFile(indexFilePath, indexFileContent, "utf-8");
}

/**
 * Generates the content for a configuration index file by combining imports, component entries,
 * and TypeScript-related handling.
 *
 * @param {string[]} imports - An array of import statements to include in the configuration index file.
 * @param {string[]} componentEntries - An array of component entry definitions to export in the configuration index file.
 * @return {Promise<string>} The constructed configuration indexes file content as a string.
 */
export async function generateConfigIndexContent(imports = [], componentEntries = []) {
  const importsSection = imports.length ? `\n${imports.join("\n")}\n\n` : "";
  const entriesSection = componentEntries.length ? `\n${componentEntries.join("\n")}\n` : "";

  const hasTypeScript = await detectTypeScript();
  const suppressTsCheck = hasTypeScript ? `${SUPPRESS_TS_CHECK}\n` : "";

  return `${suppressTsCheck}${COMPONENTS_INDEX_COMMENT}\n${importsSection}${COMPONENTS_INDEX_EXPORT.replace(
    "{}",
    `{${entriesSection}}`,
  )}
`;
}
