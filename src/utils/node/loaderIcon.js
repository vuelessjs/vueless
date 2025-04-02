/**
 This scrypt find icon names from the UIcon props and objects across the project
 and copy SVG icons from the default icons library (@material-symbols or other from config)
 to the `VUELESS_ICONS_CACHED_DIR` folder.
 */

/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { rm, cp } from "node:fs/promises";
import { createRequire } from "module";
import { merge } from "lodash-es";

import { vuelessConfig } from "./vuelessConfig.js";
import { getDirFiles, getComponentDefaultConfig } from "./helper.js";
import {
  COMPONENTS,
  VUELESS_DIR,
  VUELESS_LOCAL_DIR,
  VUELESS_LIBRARY,
  VUELESS_ICONS_DIR,
  VUELESS_ICONS_LOCAL_DIR,
  VUELESS_ICONS_CACHED_DIR,
  VUELESS_CONFIG_FILE_NAME,
  STORYBOOK_ICONS_LOCAL_DIR,
  ICONS_DIR,
} from "../../constants.js";

const DEFAULT_ICONS_DIR = path.join(cwd(), VUELESS_ICONS_DIR);
const DEFAULT_ICONS_LOCAL_DIR = path.join(cwd(), VUELESS_ICONS_LOCAL_DIR);
const CACHED_ICONS_DIR = path.join(cwd(), VUELESS_ICONS_CACHED_DIR);
const CACHED_STORYBOOK_ICONS_DIR = path.join(CACHED_ICONS_DIR, "storybook");
const STORYBOOK_ASSETS_DIR = path.join(cwd(), STORYBOOK_ICONS_LOCAL_DIR);
const VUELESS_ICONS_CACHE_DIR = path.join(CACHED_ICONS_DIR, "vueless");
const U_ICON = "UIcon";

let isDebug = false;
let isVuelessEnv = false;
let isStorybookMode = false;
let isVuelessIconsMode = false;

/**
 * Dynamically find icons across the project and cache it.
 * Icons cache magick happens here... ✨
 * @param {string} mode
 * @param {string} env
 * @param {boolean} debug
 * @param {Array} targetFiles
 */
export async function cacheIcons({ mode, env, debug, targetFiles = [] } = {}) {
  isDebug = debug || false;
  isVuelessEnv = env === "vueless";
  isStorybookMode = mode === "storybook";
  isVuelessIconsMode = mode === "vuelessIcons";

  if (isVuelessIconsMode) {
    targetFiles = isVuelessEnv
      ? [path.join(cwd(), VUELESS_LOCAL_DIR)]
      : [path.join(cwd(), VUELESS_DIR)];
  }

  const commonExcludes = ["/types.ts", "/constants.ts"];
  const exclude = isStorybookMode
    ? [...commonExcludes]
    : [...commonExcludes, "/stories.js", "/stories.ts", ".d.ts"];

  const vueFiles = targetFiles.map((componentPath) => getDirFiles(componentPath, ".vue"));
  const jsFiles = targetFiles.map((jsFilePath) => getDirFiles(jsFilePath, ".js", { exclude }));
  const tsFiles = targetFiles.map((tsFilePath) => getDirFiles(tsFilePath, ".ts", { exclude }));

  const iconFiles = await Promise.all([...vueFiles, ...jsFiles, ...tsFiles]);

  let filesToProcess = iconFiles.flat();

  if (isStorybookMode) {
    filesToProcess = filesToProcess.filter(
      (file) => file.includes("/stories.js") || file.includes("/stories.ts"),
    );
  }

  if ((isVuelessIconsMode && isVuelessEnv) || !isVuelessIconsMode) {
    const configFiles = isStorybookMode
      ? []
      : [`${VUELESS_CONFIG_FILE_NAME}.js`, `${VUELESS_CONFIG_FILE_NAME}.ts`];

    await findAndCopyIcons([...filesToProcess, ...configFiles]);
  }

  isStorybookMode ? await copyCachedStorybookIcons() : await copyCachedVuelessIcons(isVuelessEnv);
}

/**
 * Remove cached icons.
 * @param {string} mirrorCacheDir
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
export async function removeIconsCache(mirrorCacheDir, debug) {
  if (fs.existsSync(CACHED_ICONS_DIR)) {
    await rm(CACHED_ICONS_DIR, { recursive: true, force: true });
  }

  if (mirrorCacheDir) {
    const mirrorCacheIconsPath = path.join(cwd(), mirrorCacheDir, ICONS_DIR);

    if (fs.existsSync(mirrorCacheIconsPath)) {
      await rm(mirrorCacheIconsPath, { recursive: true, force: true });
    }
  }

  if (debug) {
    console.log("Icons cache was successfully removed.");
  }
}

/**
 * Copy cached icons in the provided folder by path.
 * @param {string} mirrorCacheDir
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
export async function copyIconsCache(mirrorCacheDir, debug) {
  const cachePath = path.join(cwd(), VUELESS_ICONS_CACHED_DIR);

  if (mirrorCacheDir && fs.existsSync(cachePath)) {
    await cp(cachePath, path.join(cwd(), mirrorCacheDir, ICONS_DIR), { recursive: true });
  }

  if (debug) {
    console.log(`Vueless cached icons was successfully copied into: ${mirrorCacheDir}.`);
  }
}

/**
 * Copy icons which are used in vueless components to the cache.
 * @returns {Promise<void>}
 */
async function copyCachedVuelessIcons(isVuelessEnv) {
  if (isVuelessEnv && fs.existsSync(CACHED_ICONS_DIR)) {
    await cp(CACHED_ICONS_DIR, DEFAULT_ICONS_LOCAL_DIR, {
      recursive: true,
    });
  }

  if (!isVuelessEnv && fs.existsSync(DEFAULT_ICONS_DIR)) {
    await cp(DEFAULT_ICONS_DIR, CACHED_ICONS_DIR, {
      recursive: true,
    });
  }
}

/**
 * Copy icons which are used in storybook to the cache.
 * @returns {Promise<void>}
 */
async function copyCachedStorybookIcons() {
  if (fs.existsSync(CACHED_STORYBOOK_ICONS_DIR)) {
    // Create destination directory if it doesn't exist
    fs.mkdirSync(STORYBOOK_ASSETS_DIR, { recursive: true });

    await cp(CACHED_STORYBOOK_ICONS_DIR, STORYBOOK_ASSETS_DIR, {
      recursive: true,
    });

    isDebug && console.log(`Storybook icons successfully copied to: ${STORYBOOK_ASSETS_DIR}`);
  }
}

/**
 * Scan the project for icon names and copy found icons to the cache.
 * @param {Array} files
 */
async function findAndCopyIcons(files) {
  const defaults = await getDefaults();
  const safelistIcons = vuelessConfig.components?.[U_ICON]?.safelistIcons;

  safelistIcons?.forEach((iconName) => {
    copyIcon(iconName, defaults);
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
          if (iconName) {
            copyIcon(iconName, defaults);
          }
        } catch (error) {
          isDebug && console.log(error);
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

          copyIcon(trueName, defaults);
          copyIcon(falseName, defaults);
        } else {
          copyIcon(iconName, defaults);
        }
      } catch (error) {
        isDebug && console.log(error);
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
 * @param {object} defaults
 */
async function copyIcon(name, defaults) {
  name = name.toLowerCase();

  const iconNameRegex = /^[a-z0-9_-]+$/;

  /* Stop the scrypt if the icon name is irrelevant. */
  if (!iconNameRegex.test(name)) {
    return;
  }

  // Get paths for both destinations
  const { source, destination: vuelessDestination } = getIconLibraryPaths(
    name,
    defaults,
    "vueless",
  );
  const { destination: storybookDestination } = getIconLibraryPaths(name, defaults, "storybook");

  const require = createRequire(import.meta.url);

  // Handle storybook mode - only copy to storybook destination
  if (isStorybookMode) {
    if (fs.existsSync(source) && !fs.existsSync(storybookDestination)) {
      const destDir = path.dirname(storybookDestination);

      fs.mkdirSync(destDir, { recursive: true });
      await cp(require.resolve(source), storybookDestination);
      isDebug && console.log(`Copied icon '${name}' to storybook cache: ${storybookDestination}`);
    }

    return; // Exit function to prevent copying to vueless destination
  }

  // For vueless icons mode or other modes, copy to vueless destination
  if (!isStorybookMode && fs.existsSync(source) && !fs.existsSync(vuelessDestination)) {
    const destDir = path.dirname(vuelessDestination);

    fs.mkdirSync(destDir, { recursive: true });
    await cp(require.resolve(source), vuelessDestination);
    isDebug && console.log(`Copied icon '${name}' to vueless cache: ${vuelessDestination}`);
  }
}

/**
 * Build a path to the icon source in the selected icon library and cache destination path.
 * @param {string} name
 * @param {object} defaults
 * @param {string} internalMode - "storybook" or "vueless"
 * @returns {source: string, destination: string}
 */
function getIconLibraryPaths(name, defaults, internalMode = "vueless") {
  const customLibraryPath = defaults.path;
  const library = defaults.library;
  const weight = defaults.weight;
  const style = defaults.style;

  // Determine cache directory based on internal mode
  const cacheDir =
    internalMode === "storybook" ? CACHED_STORYBOOK_ICONS_DIR : VUELESS_ICONS_CACHE_DIR;

  /* eslint-disable prettier/prettier */
  const libraries = {
    [VUELESS_LIBRARY]: {
      // @material-symbols icons which used across the components (this works only at Vueless env).
      source: `${cwd()}/node_modules/${library}/svg-${weight}/${style}/${name}.svg`,
      destination: `${cacheDir}/${name}.svg`
    },
    "@material-symbols": {
      source: `${cwd()}/node_modules/${library}/svg-${weight}/${style}/${name}.svg`,
      destination: `${cacheDir}/${library}/svg-${weight}/${style}/${name}.svg`
    },
    "bootstrap-icons": {
      source: `${cwd()}/node_modules/${library}/icons/${name}.svg`,
      destination: `${cacheDir}/${library}/${name}.svg`
    },
    "heroicons": {
      source: `${cwd()}/node_modules/${library}/24/${name.endsWith("-fill") ? "solid" : "outline"}/${name}.svg`,
      destination: `${cacheDir}/${library}/${name.endsWith("-fill") ? "solid" : "outline"}/${name}.svg`
    },
    "custom-icons": {
      source: `${cwd()}/${customLibraryPath}/${name}.svg`,
      destination: `${cacheDir}/${library}/${name}.svg`
    },
  };
  /* eslint-enable prettier/prettier */

  const libraryName = isVuelessIconsMode && isVuelessEnv ? VUELESS_LIBRARY : library;

  return libraries[libraryName];
}

/**
 * Merge global and local defaults config for UIcon.
 * @returns {Object}
 */
async function getDefaults() {
  const defaultIconsDir = isVuelessEnv ? VUELESS_LOCAL_DIR : VUELESS_DIR;
  const defaultConfigPath = path.join(cwd(), defaultIconsDir, COMPONENTS[U_ICON], "config.ts");
  const uIconDefaultConfig = await getComponentDefaultConfig(U_ICON, defaultConfigPath);

  return merge({}, uIconDefaultConfig?.defaults, vuelessConfig.components?.[U_ICON]?.defaults);
}
