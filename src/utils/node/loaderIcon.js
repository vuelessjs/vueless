/**
 This scrypt find icon names from the UIcon props and objects across the project
 and copy SVG icons from the default icons library (@material-symbols or other from config)
 to the ".../cache" folder.

 Those icons will be used only in the build stage.
 The script is needed to avoid all @material-symbols icons set in the project bundle.
 */

/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "module";
import { rm, cp } from "node:fs/promises";

import { vuelessConfig } from "./vuelessConfig.js";
import { getDirFiles, getDefaultConfigJson, merge } from "./helper.js";
import { CACHE_PATH, VUELESS_CONFIG_FILE_NAME } from "../../constants.js";

const ICONS_DIR = "assets/icons";
const DEFAULT_ICONS_DIR = path.join(process.cwd(), `node_modules/vueless/${ICONS_DIR}`);
const DEFAULT_ICONS_LOCAL_DIR = path.join(process.cwd(), `src/${ICONS_DIR}`);
const CACHED_ICONS_DIR = path.join(process.cwd(), `${CACHE_PATH}/${ICONS_DIR}`);
const ICON_CONFIG_PATH = "ui.image-icon/config.ts";
const ICON_COMPONENT_NAME = "UIcon";
const STORYBOOK_STORY_EXTENSIONS = ["/stories.js", "/stories.ts"];

let isDebug = false;
let isVuelessEnv = false;
let isDefaultMode = false;
let isStorybookMode = false;
let isVuelessIconsMode = false;
let cachedIconsDir = CACHED_ICONS_DIR;

// perform icons copy magick... ✨
export async function copyIcons({ mode = "", env, debug, targetFiles = [] } = {}) {
  isDebug = debug || false;
  isVuelessEnv = env === "vueless";
  isDefaultMode = mode === "";
  isStorybookMode = mode === "storybook";
  isVuelessIconsMode = mode === "vuelessIcons";

  /* Copy icons which using in vueless components to the cache (vueless env only). */
  if (isVuelessEnv && fs.existsSync(DEFAULT_ICONS_LOCAL_DIR)) {
    await cp(DEFAULT_ICONS_LOCAL_DIR, CACHED_ICONS_DIR, { recursive: true });
  }

  /* Copy icons which using in vueless components to the cache. */
  if (!isVuelessEnv && fs.existsSync(DEFAULT_ICONS_DIR)) {
    await cp(DEFAULT_ICONS_DIR, CACHED_ICONS_DIR, { recursive: true });
  }

  if (isVuelessIconsMode && isVuelessEnv) cachedIconsDir = DEFAULT_ICONS_LOCAL_DIR;
  if (isStorybookMode && isVuelessEnv) cachedIconsDir = CACHED_ICONS_DIR;

  if (isStorybookMode) {
    const storybookStoriesJs = await getDirFiles("src", STORYBOOK_STORY_EXTENSIONS[0]);
    const storybookStoriesTs = await getDirFiles("src", STORYBOOK_STORY_EXTENSIONS[1]);

    findAndCopyIcons([...storybookStoriesJs, ...storybookStoriesTs]);
  }

  if (isVuelessIconsMode || isDefaultMode || isStorybookMode) {
    const vueFiles = targetFiles.map((componentPath) => getDirFiles(componentPath, ".vue"));

    const jsFiles = targetFiles.map((jsFilePath) =>
      getDirFiles(jsFilePath, ".js", { exclude: [STORYBOOK_STORY_EXTENSIONS[0]] }),
    );

    const tsFiles = targetFiles.map((tsFilePath) =>
      getDirFiles(tsFilePath, ".ts", { exclude: [STORYBOOK_STORY_EXTENSIONS[1], ".d.ts"] }),
    );

    const iconFiles = await Promise.all([...vueFiles, ...jsFiles, ...tsFiles]);

    findAndCopyIcons([
      ...iconFiles.flat(),
      `${VUELESS_CONFIG_FILE_NAME}.js`,
      `${VUELESS_CONFIG_FILE_NAME}.ts`,
    ]);
  }
}

export async function removeIcons({ debug }) {
  if (!fs.existsSync(cachedIconsDir)) return;

  await rm(cachedIconsDir, { recursive: true, force: true });

  if (debug) {
    console.log("Dynamically copied icons was successfully removed.");
  }
}

function findAndCopyIcons(files) {
  const defaults = getMergedConfig();
  const safelistIcons = getSafelistIcons();

  safelistIcons.forEach((iconName) => {
    copyFile(iconName, false);
    copyFile(iconName, true);
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
            copyFile(iconName);
          }
        } catch (error) {
          isDebug && console.log(error);
        }

        iconNameRegex.lastIndex = 0;
      }
    }

    /* Vueless components props */
    const uComponentIconNamePattern = `\\b\\w*(name|icon)\\w*\\s*=\\s*(['"])(.*?)\\2`;
    const uComponentIconNameArray = fileContents.match(new RegExp(uComponentIconNamePattern, "g"));

    if (!uComponentIconNameArray) return;

    for (const match of uComponentIconNameArray) {
      const groupMatch = match.match(new RegExp(uComponentIconNamePattern));
      const iconName = groupMatch ? groupMatch[3] : null;

      try {
        if (!iconName) return;

        if (iconName?.includes("?")) {
          const [trueName, falseName] = getTernaryValues(iconName);

          copyFile(trueName);
          copyFile(falseName);
        } else {
          copyFile(iconName);
        }
      } catch (error) {
        isDebug && console.log(error);
      }
    }
  });

  function getTernaryValues(expression) {
    const [, values] = expression
      .replace(/\s/g, "") // newlines and spaces
      .replace(/\?\./g, "") // conditional chaining `?.`
      .replace(/['"]/g, "") // single and double quotes
      .split("?");

    const [trueValue, falseValue] = values.split(":");

    return [trueValue, falseValue];
  }

  function copyFile(name) {
    name = name.toLowerCase();

    const iconNameRegex = /^[a-z0-9_-]+$/;

    /* Filter irrelevant icon name cases. */
    if (!iconNameRegex.test(name)) {
      return;
    }

    const library = defaults.library;
    const weight = defaults.weight;
    const style = defaults.style;

    const require = createRequire(import.meta.url);

    /* eslint-disable vue/max-len, prettier/prettier */
    const libraries = {
      vueless: {
        // @material-symbols icons which used across the components.
        source: `${process.cwd()}/node_modules/${library}/svg-${weight}/${style}/${name}.svg`,
        destination: `${cachedIconsDir}/${name}.svg`
      },
      "@material-symbols": {
        source: `${process.cwd()}/node_modules/${library}/svg-${weight}/${style}/${name}.svg`,
        destination: `${cachedIconsDir}/${library}/svg-${weight}/${style}/${name}.svg`
      },
      "bootstrap-icons": {
        source: `${process.cwd()}/node_modules/${library}/icons/${name}.svg`,
        destination: `${cachedIconsDir}/${library}/icons/${name}.svg`
      },
      heroicons: {
        source: `${process.cwd()}/node_modules/${library}/24/${name.endsWith("-fill") ? "solid" : "outline"}/${name}.svg`,
        destination: `${cachedIconsDir}/24/${style}/${name.endsWith("-fill") ? "solid" : "outline"}/${name}.svg`
      }
    };
    /* eslint-enable vue/max-len, prettier/prettier */

    const { source, destination } =
      libraries[isVuelessIconsMode && isVuelessEnv ? "vueless" : library];

    if (fs.existsSync(destination) || !fs.existsSync(source)) return;

    const destDir = path.dirname(destination);

    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFile(require.resolve(source), destination, (error) => {
      if (isDebug) {
        error
          ? console.error(`Error copying icon "${name}":`, error)
          : console.log(`Icon "${name}" copied successfully!`);
      }
    });
  }
}

function getSafelistIcons() {
  return vuelessConfig.component
    ? vuelessConfig.component[ICON_COMPONENT_NAME]?.safelistIcons || []
    : [];
}

function getMergedConfig() {
  const defaultConfigPath = (isVuelessEnv ? "src/" : "node_modules/vueless/") + ICON_CONFIG_PATH;

  if (fs.existsSync(defaultConfigPath)) {
    const defaultConfigFile = fs.readFileSync(defaultConfigPath).toString();

    const defaultConfig = getDefaultConfigJson(defaultConfigFile);
    const globalConfig = vuelessConfig.component && vuelessConfig.component[ICON_COMPONENT_NAME];

    return merge(globalConfig?.defaults || {}, defaultConfig.defaults);
  }
}
