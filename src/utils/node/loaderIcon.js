/**
 This scrypt finds icon names from the UIcon props and objects across the project
 and copies SVG icons from the default icons library (@material-symbols or other from config)
 to the `VUELESS_ICONS_CACHED_DIR` folder.
 */

/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { rm, cp } from "node:fs/promises";
import { createRequire } from "module";
import { watch } from "chokidar";
import { merge } from "lodash-es";

import { vuelessConfig } from "./vuelessConfig.js";
import { getDirFiles, getComponentDefaultConfig } from "./helper.js";
import {
  COMPONENTS,
  VUELESS_PACKAGE_DIR,
  VUELESS_LOCAL_DIR,
  INTERNAL_ICONS_LIBRARY,
  VUELESS_CONFIG_FILE_NAME,
  ICONS_DIR,
  ICONS_CACHED_DIR,
  STORYBOOK_ICONS_LIBRARY,
  ICONS_VUELESS_DIR,
  NODE_MODULES_DIR,
  STORYBOOK_ENV,
  INTERNAL_ENV,
  RESOLVED_ICONS_VIRTUAL_MODULE_ID,
} from "../../constants.js";

let uIconDefaults = {};

/**
 * Dynamically find icons across the project and cache it.
 * Icons cache magick happens here... ✨
 * @param {string} env
 * @param {boolean} debug
 * @param {Array} targetFiles
 */
export async function cacheProjectIcons({ env, debug = false, targetFiles = [] } = {}) {
  const isInternalEnv = env === INTERNAL_ENV;
  const isStorybookEnv = env === STORYBOOK_ENV;

  uIconDefaults = await getUIconDefaults(isInternalEnv);

  let exclude = ["/constants.ts", "/types.ts", ".d.ts"];

  const vueFiles = targetFiles.map((componentPath) => getDirFiles(componentPath, ".vue"));
  const jsFiles = targetFiles.map((jsFilePath) => getDirFiles(jsFilePath, ".js", { exclude }));
  const tsFiles = targetFiles.map((tsFilePath) => getDirFiles(tsFilePath, ".ts", { exclude }));

  const files = [
    ...(await Promise.all([...vueFiles, ...jsFiles, ...tsFiles])).flat(),
    `${VUELESS_CONFIG_FILE_NAME}.js`,
    `${VUELESS_CONFIG_FILE_NAME}.ts`,
  ];

  if (isInternalEnv) {
    const storybookFiles = [];
    const internalFiles = [];

    for (const file of files) {
      file.endsWith("/stories.js") || file.endsWith("/stories.ts")
        ? storybookFiles.push(file)
        : internalFiles.push(file);
    }

    await findAndCopyIcons(storybookFiles, STORYBOOK_ICONS_LIBRARY, debug);
    await findAndCopyIcons(internalFiles, INTERNAL_ICONS_LIBRARY, debug);
  }

  if (!isInternalEnv) {
    await cachePackageIcons(isStorybookEnv);
    await findAndCopyIcons(files, uIconDefaults.library, debug);
  }
}

/**
 * Remove cached icons.
 * @param {string} mirrorCacheDir
 * @returns {Promise<void>}
 */
export async function removeIconsCache(mirrorCacheDir) {
  const cachePath = path.join(cwd(), ICONS_CACHED_DIR);

  if (fs.existsSync(cachePath)) {
    await rm(cachePath, { recursive: true, force: true });
  }

  if (mirrorCacheDir) {
    const mirrorCacheIconsPath = path.join(cwd(), mirrorCacheDir, ICONS_DIR);

    if (fs.existsSync(mirrorCacheIconsPath)) {
      await rm(mirrorCacheIconsPath, { recursive: true, force: true });
    }
  }
}

/**
 * Copy cached icons in the provided folder by path.
 * @param {string} mirrorCacheDir
 * @returns {Promise<void>}
 */
export async function copyIconsCache(mirrorCacheDir) {
  const cachePath = path.join(cwd(), ICONS_CACHED_DIR);

  if (mirrorCacheDir && fs.existsSync(cachePath)) {
    const mirrorPath = path.join(cwd(), mirrorCacheDir, ICONS_DIR);

    await cp(cachePath, mirrorPath, { recursive: true });
  }
}

/**
 * Copy Vueless package icons which are used in vueless components and storybook stories to the cache.
 * @returns {Promise<void>}
 */
async function cachePackageIcons(isStorybookEnv) {
  const internalVuelessPath = path.join(cwd(), ICONS_VUELESS_DIR, INTERNAL_ICONS_LIBRARY);
  const internalCachePath = path.join(cwd(), ICONS_CACHED_DIR, INTERNAL_ICONS_LIBRARY);

  if (fs.existsSync(internalVuelessPath)) {
    await cp(internalVuelessPath, internalCachePath, { recursive: true });
  }

  /* copy storybook icons for storybook only */
  if (isStorybookEnv) {
    const storybookVuelessPath = path.join(cwd(), ICONS_VUELESS_DIR, STORYBOOK_ICONS_LIBRARY);
    const storybookCachePath = path.join(cwd(), ICONS_CACHED_DIR, STORYBOOK_ICONS_LIBRARY);

    if (fs.existsSync(storybookVuelessPath)) {
      await cp(storybookVuelessPath, storybookCachePath, { recursive: true });
    }
  }
}

/**
 * Scan the project for icon names and copy found icons to the cache.
 * @param {Array} files
 * @param {string} library
 * @param {boolean} debug
 */
async function findAndCopyIcons(files, library, debug) {
  const safelistIcons = vuelessConfig.components?.["UIcon"]?.safelistIcons;

  safelistIcons?.forEach((iconName) => {
    copyIcon(iconName, library);
  });

  files.forEach((file) => {
    const fileContents = fs.existsSync(file) ? fs.readFileSync(file).toString() : "";

    /* Objects across the project */
    const iconNameRegex = /\w*(icon)\w*:\s*["']([^"'\s]+)["']/gi;
    const objectMatchNameArray = fileContents.match(iconNameRegex);

    if (objectMatchNameArray) {
      for (const match of objectMatchNameArray) {
        const iconNameMatch = iconNameRegex.exec(match);
        const iconName = iconNameMatch && iconNameMatch[2];

        try {
          iconName && copyIcon(iconName, library);
        } catch (error) {
          debug && console.log(error);
        }

        iconNameRegex.lastIndex = 0;
      }
    }

    /* Vueless components props */
    const iconPropsPattern = `\\b\\w*(name|icon)\\w*\\s*=\\s*(['"])(.*?)\\2`;
    const uComponentIconNamePattern =
      /<U\w+\b[^>]*?\b\w*(name|icon)\w*\s*[:=]\s*(['"])(.*?)\2[^>]*?>/;
    const uComponentIconNameArray = fileContents.match(new RegExp(uComponentIconNamePattern, "g"));

    if (!uComponentIconNameArray) return;

    for (const match of uComponentIconNameArray) {
      const groupMatch = match.match(new RegExp(iconPropsPattern));
      const iconName = groupMatch ? groupMatch[3] : null;

      try {
        if (!iconName) continue;

        if (iconName.includes("?") && iconName.includes(":")) {
          const [trueName, falseName] = getTernaryValues(iconName);

          copyIcon(trueName, library);
          copyIcon(falseName, library);
        } else {
          copyIcon(iconName, library);
        }
      } catch (error) {
        debug && console.log(error);
      }
    }
  });
}

/**
 * Retrieve values from ternary of strings.
 * @param {string} expression
 * @returns {Array} of ternary values
 */
function getTernaryValues(expression) {
  const [, values] = expression
    .replace(/\s/g, "") // newlines and spaces
    .replace(/\?\./g, "") // conditional chaining `?.`
    .replace(/['"]/g, "") // single and double quotes
    .split("?");

  const [trueValue, falseValue] = values.split(":");

  return [trueValue, falseValue];
}

/**
 * Copy icon from icon package into cache folder.
 * @param {string} name
 * @param library
 */
async function copyIcon(name, library) {
  name = name.toLowerCase();

  const iconNameRegex = /^(icon|lefticon|righticon|[a-z0-9_-]+)$/;

  /* Stop the script if the icon name is irrelevant. */
  if (!iconNameRegex.test(name)) {
    return;
  }

  const { sourcePath, destinationPath } = getIconLibraryPaths(name, library);

  const require = createRequire(import.meta.url);

  if (fs.existsSync(sourcePath) && !fs.existsSync(destinationPath)) {
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    await cp(require.resolve(sourcePath), destinationPath);
  }
}

/**
 * Build a path to the icon source in the selected icon library and cache destination path.
 * @param {string} name
 * @param {string} library
 * @returns {sourcePath: string, destinationPath: string}
 */
function getIconLibraryPaths(name, library) {
  const destinationPath = path.join(cwd(), ICONS_CACHED_DIR, library, `${name}.svg`);
  let sourcePath = "";

  if (["@material-symbols", INTERNAL_ICONS_LIBRARY, STORYBOOK_ICONS_LIBRARY].includes(library)) {
    library = "@material-symbols";
    const { weight, style } = uIconDefaults;

    sourcePath = path.join(cwd(), NODE_MODULES_DIR, library, `svg-${weight}`, style, `${name}.svg`);
  }

  if (library === "bootstrap-icons") {
    sourcePath = path.join(cwd(), NODE_MODULES_DIR, library, "icons", `${name}.svg`);
  }

  if (library === "heroicons") {
    const fillVariant = name.endsWith("-fill") ? "solid" : "outline";
    const iconName = name.replace("-fill", "");

    sourcePath = path.join(cwd(), NODE_MODULES_DIR, library, "24", fillVariant, `${iconName}.svg`);
  }

  if (library === "custom-icons") {
    sourcePath = path.join(cwd(), uIconDefaults.path, `${name}.svg`);
  }

  return {
    sourcePath,
    destinationPath,
  };
}

/**
 * Merge global and local defaults config for UIcon.
 * @returns {Object}
 */
async function getUIconDefaults(isInternalEnv) {
  const defaultIconsDir = isInternalEnv ? VUELESS_LOCAL_DIR : VUELESS_PACKAGE_DIR;

  const defaultConfigPath = path.join(cwd(), defaultIconsDir, COMPONENTS["UIcon"], "config.ts");
  const uIconDefaultConfig = await getComponentDefaultConfig("UIcon", defaultConfigPath);

  return merge({}, uIconDefaultConfig?.defaults, vuelessConfig.components?.["UIcon"]?.defaults);
}

/**
 * Generates an export statement for cached SVG icon files by importing them dynamically.
 * The method scans a specified directory for SVG files, constructs their full import paths,
 * and maps them into an array that can be exported.
 *
 * @return {string} A string containing the export statement for the cached SVG icons as an array.
 */
export function generateIconExports() {
  const cachePath = path.join(cwd(), ICONS_CACHED_DIR);
  const files = walkSvgFiles(cachePath);

  const entries = files
    .map((relativePath) => {
      const fullImportPath = path.resolve(cachePath, relativePath).replace(/\\/g, "/");
      const virtualPath = path.join(cwd(), ICONS_CACHED_DIR, relativePath);

      return `  ["${virtualPath}", import("${fullImportPath}?component")]`;
    })
    .join(",\n");

  return `export const cachedIcons = [\n${entries}\n];`;
}

/**
 * Recursively walks through the specified directory and its subdirectories to find all `.svg` files.
 * Returns an array of file paths relative to the provided base directory.
 *
 * @param {string} dir - The directory to start searching for `.svg` files.
 * @param {string} [baseDir=dir] - The base directory used for calculating relative file paths. Defaults to the `dir` parameter.
 * @return {string[]} An array of relative file paths for all `.svg` files found.
 */
function walkSvgFiles(dir, baseDir = dir) {
  let results = [];

  const list = fs.readdirSync(dir);

  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(walkSvgFiles(fullPath, baseDir));
    } else if (file.endsWith(".svg")) {
      const relative = path.relative(baseDir, fullPath);

      results.push(relative.replace(/\\/g, "/"));
    }
  }

  return results;
}

/**
 * Reloads the server when the icons cache is updated. This function sets up a file system watcher
 * on the icons cache directory and triggers a full server reload whenever files are added or removed.
 *
 * @param {Object} server - The server instance to be reloaded. It is expected to have `moduleGraph` and `ws` properties
 *                          for invalidating modules and sending websocket messages respectively.
 * @return {void} This function does not return any value.
 */
export function reloadServerOnIconsCacheUpdate(server) {
  function reloadServer() {
    server.moduleGraph.invalidateModule(
      server.moduleGraph.getModuleById(RESOLVED_ICONS_VIRTUAL_MODULE_ID),
    );

    server.ws.send({ type: "full-reload", path: "*" });
  }

  const cachePath = path.join(cwd(), ICONS_CACHED_DIR);
  const watcher = watch(cachePath, { ignoreInitial: true });

  watcher.on("add", reloadServer).on("unlink", reloadServer);
}
