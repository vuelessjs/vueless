import path from "node:path";
import { cwd } from "node:process";
import { existsSync, unlinkSync, writeFile } from "node:fs";
import { readFile } from "node:fs/promises";
import { merge } from "lodash-es";
import { extendTailwindMerge } from "tailwind-merge";
import { defineConfig } from "cva";

import { vuelessConfig } from "./vuelessConfig.js";
import { createGetMergedConfig } from "./mergeConfigs.js";
import { getComponentDefaultConfig, getDirFiles } from "./helper.js";
import {
  COMPONENTS,
  PRIMARY_COLOR,
  NEUTRAL_COLOR,
  PRIMARY_COLORS,
  SECONDARY_COLOR,
  GRAYSCALE_COLOR,
  NEUTRAL_COLORS,
  STATE_COLORS,
  COLOR_SHADES,
  SYSTEM_CONFIG_KEY,
  DYNAMIC_COLOR_PATTERN,
  TAILWIND_MERGE_EXTENSION,
  VUELESS_TAILWIND_SAFELIST,
  NESTED_COMPONENT_PATTERN_REG_EXP,
} from "../../constants.js";

const SAFELIST_DIR = path.join(cwd(), VUELESS_TAILWIND_SAFELIST);

const twMerge = extendTailwindMerge(merge(TAILWIND_MERGE_EXTENSION, vuelessConfig.tailwindMerge));

export const { cx } = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(NESTED_COMPONENT_PATTERN_REG_EXP, ""),
  },
});

const getMergedConfig = createGetMergedConfig(cx);

export function clearTailwindSafelist() {
  if (existsSync(SAFELIST_DIR)) {
    unlinkSync(SAFELIST_DIR);
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

  const vuelessFiles = [...srcVueFiles, ...vuelessVueFiles, ...vuelessConfigFiles];

  const safelistClasses = [];

  const storybookColors = {
    colors: [...STATE_COLORS, PRIMARY_COLOR, NEUTRAL_COLOR, GRAYSCALE_COLOR],
    isComponentExists: true,
  };

  const componentNames = Object.keys(COMPONENTS);

  for await (const componentName of componentNames) {
    const { colors, isComponentExists } = isStorybookMode
      ? storybookColors
      : await findComponentColors(componentName, vuelessFiles, vuelessConfigFiles);

    const defaultConfig = await retrieveComponentDefaultConfig(componentName, vuelessConfigFiles);
    const match = JSON.stringify(defaultConfig).match(/\{U\w+\}/g) || [];

    const nestedComponents = match.map((nestedComponentPattern) =>
      nestedComponentPattern.replaceAll(/[{}]/g, ""),
    );

    if (isComponentExists && colors.length) {
      const mergedConfig = await getMergedComponentConfig(componentName, vuelessConfigFiles);
      const componentSafelist = await getComponentSafelist(mergedConfig, colors);

      safelistClasses.push(...componentSafelist);
    }

    if (isComponentExists && colors.length && nestedComponents.length) {
      for await (const nestedComponent of nestedComponents) {
        const mergedConfig = await getMergedComponentConfig(nestedComponent, vuelessConfigFiles);
        const nestedComponentSafelist = await getComponentSafelist(mergedConfig, colors);

        safelistClasses.push(...nestedComponentSafelist);
      }
    }
  }

  /* Safelist all color variables to allow runtime color switching feature. */
  const colorSafelistVariables = COLOR_SHADES.map((shade) => {
    const primaryColorsCSSConstants = PRIMARY_COLORS.map((color) => `--color-${color}-${shade}`);
    const neutralColorsCSSConstants = NEUTRAL_COLORS.map((color) => `--color-${color}-${shade}`);

    return [...primaryColorsCSSConstants, ...neutralColorsCSSConstants].join("\n");
  });

  const safelist = [...new Set(safelistClasses), ...new Set(colorSafelistVariables)];

  writeFile(SAFELIST_DIR, safelist.join("\n"), (err) => {
    if (err) throw err;
  });

  if (debug) {
    // eslint-disable-next-line no-console
    console.log("safelist", safelist);
  }
}

function getSafelistClasses(config) {
  const safelistItems = [];

  for (const key in config) {
    if (key === SYSTEM_CONFIG_KEY.defaults) continue;

    if (Object.prototype.hasOwnProperty.call(config, key)) {
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

  getSafelistClasses(mergedConfig).map((safelistClass) => {
    colors.forEach((color) => {
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

async function findComponentColors(componentName, files, vuelessConfigFiles) {
  const objectColorRegExp = new RegExp(/\bcolor\s*:\s*["']([^"'\s]+)["']/, "g");
  const singleColorRegExp = new RegExp(/\bcolor\s*=\s*["']([^"'\s]+)["']/);
  const ternaryColorRegExp = new RegExp(/\bcolor="[^']*'([^']*)'\s*:\s*'([^']*)'/);

  const mergedComponentConfig = await getMergedComponentConfig(componentName, vuelessConfigFiles);
  const defaultColor = mergedComponentConfig.defaults?.color || vuelessConfig.primary || "";
  const colors = new Set();

  if (defaultColor && defaultColor !== GRAYSCALE_COLOR) {
    colors.add(defaultColor);
  }

  getSafelistColorsFromConfig(componentName).forEach((color) => colors.add(color));

  let isComponentExists = false;

  for await (const file of files) {
    if (!existsSync(file)) continue;

    const fileContent = await readFile(file, "utf-8");
    const isDefaultConfig = isDefaultComponentConfig(file, componentName);
    const componentRegExp = new RegExp(`<${componentName}[^>]+>`, "g");
    const componentExtendExp = new RegExp(`{${componentName}}`, "g");
    const matchedComponent = fileContent.match(componentRegExp);
    const matchedExtendComponent = fileContent.match(componentExtendExp);

    if (!isComponentExists) {
      isComponentExists = Boolean(matchedComponent);
    }

    if (isDefaultConfig) {
      fileContent.match(objectColorRegExp)?.forEach((colorMatch) => {
        const [, color] = objectColorRegExp.exec(colorMatch) || [];

        colors.add(color);
      });
    }

    if (matchedExtendComponent) {
      const objectColors = objectColorRegExp.exec(fileContent) || [];

      objectColors.forEach((color) => {
        if (color) colors.add(color);
      });
    }

    /* Collect color from U[Component] */
    matchedComponent?.forEach((match) => {
      const [, singleColor] = singleColorRegExp.exec(match) || [];
      const [, ternaryColorOne, ternaryColorTwo] = ternaryColorRegExp.exec(match) || [];

      // Match color in script variables.
      const objectColors = objectColorRegExp.exec(fileContent) || [];

      [singleColor, ternaryColorOne, ternaryColorTwo, ...objectColors].forEach((color) => {
        if (color) colors.add(color);
      });
    });
  }

  return {
    colors: Array.from(colors).filter(
      (color) =>
        color && [...STATE_COLORS, PRIMARY_COLOR, SECONDARY_COLOR, GRAYSCALE_COLOR].includes(color),
    ),
    isComponentExists,
  };
}

function isDefaultComponentConfig(filePath, componentName) {
  const componentDirName = filePath.split(path.sep).at(-2);

  return (
    componentDirName === COMPONENTS[componentName] &&
    (filePath.endsWith("/config.js") || filePath.endsWith("/config.ts"))
  );
}

function getSafelistColorsFromConfig(componentName) {
  const globalSafelistColors = vuelessConfig.safelistColors || [];
  const componentSafelistColors = vuelessConfig.components?.[componentName]?.safelistColors || [];

  return [...globalSafelistColors, ...componentSafelistColors];
}
