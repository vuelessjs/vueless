/**
 This scrypt find icon names from the UIcon props and objects across the project
 and copy SVG icons from the default icons library (@material-symbols or other from config)
 to the ".../cache" folder.
 
 Those icons will be used only in the build stage.
 The script is needed to avoid all @material-symbols icons set in the project bundle.
 */

/* eslint-disable no-console */
import fs from "node:fs";
import { rm, cp } from "node:fs/promises";
import path from "node:path";
import { getDirFiles, getDefaultConfigJson } from "./common.js";
import { createRequire } from "module";

let vuelessConfig = {};

/* Load Vueless config from the project root in IIFE (no top-level await). */
(async () => {
  try {
    const filePath = `${process.cwd()}/vueless.config`;

    vuelessConfig = (await import(`${filePath}.js`)).default;

    if (!vuelessConfig) {
      vuelessConfig = (await import(`${filePath}.ts`)).default;
    }
  } catch (error) {
    vuelessConfig = {};
  }
})();

const DEFAULT_ICONS_DIR = "./src/assets/icons";
const VUELESS_ICONS_DIR = "./src/assets/icons/cache";
const PROJECT_ICONS_DIR = path.join(process.cwd(), "/node_modules/vueless/assets/icons/cache");
const DEFAULT_CONFIG_PATH = "ui.image-icon/config.js";
const STORYBOOK_STORY_EXTENSION = "/stories.js";
const ICON_COMPONENT_NAME = "UIcon";

let isDebug = false;
let isVuelessEnv = false;
let isDefaultMode = false;
let isStorybookMode = false;
let isVuelessIconsMode = false;
let iconCacheDir = PROJECT_ICONS_DIR;

// perform icons copy magick... ✨
export async function copyIcons({ mode = "", env, debug, targetFiles = [], isNuxt } = {}) {
  isDebug = debug || false;
  isVuelessEnv = env === "vueless";
  isDefaultMode = mode === "";
  isStorybookMode = mode === "storybook";
  isVuelessIconsMode = mode === "vuelessIcons";

  if (isVuelessIconsMode && isVuelessEnv) iconCacheDir = DEFAULT_ICONS_DIR;
  if (isStorybookMode && isVuelessEnv) iconCacheDir = VUELESS_ICONS_DIR;

  if (isStorybookMode) {
    const storyBookFiles = await getDirFiles("src", STORYBOOK_STORY_EXTENSION);

    findAndCopyIcons(storyBookFiles.flat());
  }

  if (isVuelessIconsMode || isDefaultMode || isStorybookMode) {
    const vueFiles = targetFiles.map((componentPath) => getDirFiles(componentPath, ".vue"));

    const jsFiles = targetFiles.map((jsFilePath) =>
      getDirFiles(jsFilePath, ".js", { exclude: [STORYBOOK_STORY_EXTENSION] }),
    );

    const tsFiles = targetFiles.map((tsFilePath) =>
      getDirFiles(tsFilePath, ".ts", { exclude: [STORYBOOK_STORY_EXTENSION, ".d.ts"] }),
    );

    const iconFiles = await Promise.all([...vueFiles, ...jsFiles, ...tsFiles]);

    findAndCopyIcons([...iconFiles.flat(), "vueless.config.js", "vueless.config.ts"]);
  }

  if (isNuxt) {
    await cp(path.join(process.cwd(), "node_modules/vueless/assets"), path.join(process.cwd(), "assets/.vueless"), {
      recursive: true,
    });
  }
}

export async function removeIcons({ debug, isNuxt }) {
  if (!fs.existsSync(iconCacheDir)) return;

  await rm(iconCacheDir, { recursive: true, force: true });

  if (isNuxt) {
    await rm(path.join(process.cwd(), "assets/.vueless"), { recursive: true, force: true });
  }

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

    const library = defaults.library;
    const weight = defaults.weight;
    const style = defaults.style;

    const require = createRequire(import.meta.url);

    /* eslint-disable prettier/prettier */
    const libraries = {
      vueless: {
        // @material-symbols icons which used across the components.
        source: `${process.cwd()}/node_modules/${library}/svg-${weight}/${style}/${name}.svg`,
        destination: `${iconCacheDir}/${name}.svg`
      },
      "@material-symbols": {
        source: `${process.cwd()}/node_modules/${library}/svg-${weight}/${style}/${name}.svg`,
        destination: `${iconCacheDir}/${library}/svg-${weight}/${style}/${name}.svg`
      },
      "bootstrap-icons": {
        source: `${process.cwd()}/node_modules/${library}/icons/${name}.svg`,
        destination: `${iconCacheDir}/${library}/icons/${name}.svg`
      },
      heroicons: {
        source: `${process.cwd()}/node_modules/${library}/24/${name.endsWith("-fill") ? "solid" : "outline"}/${name}.svg`,
        destination: `${iconCacheDir}/24/${style}/${name.endsWith("-fill") ? "solid" : "outline"}/${name}.svg`
      }
    };
    /* eslint-enable prettier/prettier */

    const { source, destination } = libraries[isVuelessIconsMode && isVuelessEnv ? "vueless" : library];

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
  return vuelessConfig.component ? vuelessConfig.component[ICON_COMPONENT_NAME]?.safelistIcons || [] : [];
}

function getMergedConfig() {
  const defaultConfigPath = (isVuelessEnv ? "src/" : "node_modules/vueless/") + DEFAULT_CONFIG_PATH;

  if (fs.existsSync(defaultConfigPath)) {
    const defaultConfigFile = fs.readFileSync(defaultConfigPath).toString();

    const defaultConfig = getDefaultConfigJson(defaultConfigFile);
    const globalConfig = vuelessConfig.component && vuelessConfig.component[ICON_COMPONENT_NAME];

    return merge(globalConfig?.defaults || {}, defaultConfig.defaults);
  }
}

function merge(source, target) {
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
