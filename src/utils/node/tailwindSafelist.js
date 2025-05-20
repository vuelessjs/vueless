import path from "node:path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { readFile, unlink, writeFile } from "node:fs/promises";

import { vuelessConfig } from "./vuelessConfig.js";
import { getDefaultComponentConfig, getMergedComponentConfig, getDirFiles } from "./helper.js";
import {
  COMPONENTS,
  PRIMARY_COLORS,
  NEUTRAL_COLORS,
  STATE_COLORS,
  COLOR_SHADES,
  SYSTEM_CONFIG_KEY,
  DYNAMIC_COLOR_PATTERN,
  VUELESS_TAILWIND_SAFELIST,
  INTERNAL_ENV,
  STORYBOOK_ENV,
  VUELESS_LOCAL_DIR,
  VUELESS_PACKAGE_DIR,
} from "../../constants.js";

const SAFELIST_DIR = path.join(cwd(), VUELESS_TAILWIND_SAFELIST);

export async function clearTailwindSafelist() {
  if (existsSync(SAFELIST_DIR)) {
    await unlink(SAFELIST_DIR);
  }
}

export async function createTailwindSafelist({ env, debug, targetFiles = [] } = {}) {
  const isStorybookEnv = env === STORYBOOK_ENV;
  const isInternalEnv = env === INTERNAL_ENV;
  const vuelessFilePath = isInternalEnv ? VUELESS_LOCAL_DIR : VUELESS_PACKAGE_DIR;

  const vuelessVueFiles = await getDirFiles(vuelessFilePath, ".vue");
  const vuelessConfigJsFiles = await getDirFiles(vuelessFilePath, "/config.ts");
  const vuelessConfigTsFiles = await getDirFiles(vuelessFilePath, "/config.js");
  const vuelessConfigFiles = [...vuelessConfigJsFiles, ...vuelessConfigTsFiles].flat();

  let srcVueFiles = [];

  if (!isInternalEnv) {
    srcVueFiles = await Promise.all(
      targetFiles.map((componentPath) => getDirFiles(componentPath, ".vue")),
    );

    srcVueFiles = srcVueFiles.flat();
  }

  const files = [...srcVueFiles, ...vuelessVueFiles];

  const safelistClasses = [];

  const isCustomColors = vuelessConfig.colors && vuelessConfig.colors.length;
  const colors = !isCustomColors ? STATE_COLORS : vuelessConfig.colors;
  const componentNames = Object.keys(COMPONENTS);

  for await (const componentName of componentNames) {
    const isCurrentComponentUsed = await isComponentUsed(componentName, files);
    const defaultConfig = await retrieveComponentDefaultConfig(componentName, vuelessConfigFiles);
    const match = JSON.stringify(defaultConfig).match(/\{U\w+\}/g) || [];

    const nestedComponents = match.map((nestedComponentPattern) =>
      nestedComponentPattern.replaceAll(/[{}]/g, ""),
    );

    if (isCurrentComponentUsed || isStorybookEnv || isInternalEnv) {
      const mergedConfig = await getMergedComponentConfig(componentName);
      const componentSafelist = await getComponentSafelist(mergedConfig, colors);

      safelistClasses.push(...componentSafelist);
    }

    if ((isCurrentComponentUsed || isStorybookEnv || isInternalEnv) && nestedComponents.length) {
      for await (const nestedComponent of nestedComponents) {
        const mergedConfig = await getMergedComponentConfig(nestedComponent);
        const nestedComponentSafelist = await getComponentSafelist(mergedConfig, colors);

        safelistClasses.push(...nestedComponentSafelist);
      }
    }
  }

  // TODO: Prevent this if `runtimeColors` is disabled.
  /* Safelist all color variables to allow runtime color switching feature. */
  const colorVariables = [...PRIMARY_COLORS, ...NEUTRAL_COLORS];
  const colorSafelistVariables = COLOR_SHADES.map((shade) => {
    const colorsCSSConstants = colorVariables.map((color) => `--color-${color}-${shade}`);

    return colorsCSSConstants.join("\n");
  });

  const safelist = [...new Set([...safelistClasses, ...colorSafelistVariables])];

  await writeFile(SAFELIST_DIR, safelist.join("\n"));

  if (debug) {
    // eslint-disable-next-line no-console
    console.dir(safelist, { maxArrayLength: null });
  }
}

function getSafelistClasses(config) {
  const safelistItems = [];

  for (const key in config) {
    if (key === SYSTEM_CONFIG_KEY.defaults) continue;

    if (Object.hasOwn(config, key)) {
      const classes = config[key];

      if (typeof classes === "object" && Array.isArray(classes)) {
        safelistItems.push(...classes.map(getSafelistClasses));
      }

      if (typeof classes === "object" && !Array.isArray(classes)) {
        safelistItems.push(...getSafelistClasses(classes));
      }

      if (typeof classes === "string") {
        safelistItems.push(
          ...classes.split(" ").filter((classItem) => classItem.includes(DYNAMIC_COLOR_PATTERN)),
        );
      }
    }
  }

  return safelistItems.flat().map((item) => item.replaceAll("\\n", "").trim());
}

async function getComponentSafelist(mergedConfig, colors) {
  const classes = new Set();
  const defaultColor = mergedConfig.defaults?.color || "";

  getSafelistClasses(mergedConfig).map((safelistClass) => {
    [...colors, defaultColor].forEach((color) => {
      classes.add(safelistClass.replace(DYNAMIC_COLOR_PATTERN, color));
    });
  });

  return classes;
}

async function retrieveComponentDefaultConfig(componentName, vuelessConfigFiles) {
  const configDir = vuelessConfigFiles.find((filePath) => {
    return filePath.includes(`${COMPONENTS[componentName]}/`);
  });

  return await getDefaultComponentConfig(componentName, configDir);
}

async function isComponentUsed(componentName, files) {
  let isComponentUsed = false;

  for await (const file of files) {
    if (!existsSync(file)) continue;

    const fileContent = await readFile(file, "utf-8");
    const componentRegExp = new RegExp(`<${componentName}[^>]+>`, "g");
    const matchedComponent = fileContent.match(componentRegExp);

    if (!isComponentUsed && matchedComponent) {
      isComponentUsed = Boolean(matchedComponent);

      break;
    }
  }

  return isComponentUsed;
}
