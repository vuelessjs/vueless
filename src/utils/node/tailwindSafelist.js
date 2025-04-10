import path from "node:path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { readFile, unlink, writeFile } from "node:fs/promises";

import { vuelessConfig, getMergedConfig } from "./vuelessConfig.js";
import { getComponentDefaultConfig, getDirFiles } from "./helper.js";
import {
  COMPONENTS,
  PRIMARY_COLORS,
  NEUTRAL_COLORS,
  STATE_COLORS,
  COLOR_SHADES,
  SYSTEM_CONFIG_KEY,
  DYNAMIC_COLOR_PATTERN,
  VUELESS_TAILWIND_SAFELIST,
} from "../../constants.js";

const SAFELIST_DIR = path.join(cwd(), VUELESS_TAILWIND_SAFELIST);

export async function clearTailwindSafelist() {
  if (existsSync(SAFELIST_DIR)) {
    await unlink(SAFELIST_DIR);
  }
}

export async function createTailwindSafelist({ mode, env, debug, targetFiles = [] } = {}) {
  const isStorybookMode = mode === "storybook";
  const isVuelessEnv = env === "vueless";
  const vuelessFilePath = isVuelessEnv ? "src" : "node_modules/vueless";

  const vuelessVueFiles = await getDirFiles(vuelessFilePath, ".vue");
  const vuelessConfigJsFiles = await getDirFiles(vuelessFilePath, "/config.ts");
  const vuelessConfigTsFiles = await getDirFiles(vuelessFilePath, "/config.js");
  const vuelessConfigFiles = [...vuelessConfigJsFiles, ...vuelessConfigTsFiles].flat();

  let srcVueFiles = [];

  if (!isVuelessEnv) {
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

    if (isCurrentComponentUsed || isStorybookMode) {
      const mergedConfig = await getMergedComponentConfig(componentName, vuelessConfigFiles);
      const componentSafelist = await getComponentSafelist(mergedConfig, colors);

      safelistClasses.push(...componentSafelist);
    }

    if ((isCurrentComponentUsed || isStorybookMode) && nestedComponents.length) {
      for await (const nestedComponent of nestedComponents) {
        const mergedConfig = await getMergedComponentConfig(nestedComponent, vuelessConfigFiles);
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

async function getMergedComponentConfig(componentName, vuelessConfigFiles) {
  return getMergedConfig({
    defaultConfig: await retrieveComponentDefaultConfig(componentName, vuelessConfigFiles),
    globalConfig: vuelessConfig.components?.[componentName] || {},
    unstyled: Boolean(vuelessConfig.unstyled),
  });
}

async function retrieveComponentDefaultConfig(componentName, vuelessConfigFiles) {
  const componentDefaultConfigPath = vuelessConfigFiles.find((file) =>
    isDefaultComponentConfig(file, componentName),
  );

  return componentDefaultConfigPath
    ? await getComponentDefaultConfig(componentName, path.join(cwd(), componentDefaultConfigPath))
    : {};
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

function isDefaultComponentConfig(filePath, componentName) {
  const componentDirName = filePath.split(path.sep).at(-2);

  return (
    componentDirName === COMPONENTS[componentName] &&
    (filePath.endsWith("/config.js") || filePath.endsWith("/config.ts"))
  );
}
