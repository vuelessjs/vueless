import path from "node:path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { merge, cloneDeep, isEqual } from "lodash-es";
import { extendTailwindMerge } from "tailwind-merge";
import { defineConfig } from "cva";

import { vuelessConfig } from "./vuelessConfig.js";
import { createGetMergedConfig } from "./mergeConfigs.js";
import { getComponentDefaultConfig, getDirFiles } from "./helper.js";
import {
  COMPONENTS,
  GRAY_COLOR,
  BRAND_COLOR,
  BRAND_COLORS,
  STRATEGY_TYPE,
  SYSTEM_CONFIG_KEY,
  DYNAMIC_COLOR_PATTERN,
  TAILWIND_MERGE_EXTENSION,
  TAILWIND_VARIANT_DELIMITER,
  TAILWIND_COLOR_OPACITY_DELIMITER,
  NESTED_COMPONENT_PATTERN_REG_EXP,
  TAILWIND_VARIANT_DELIMITER_REG_EXP,
} from "../../constants.js";

const twMerge = extendTailwindMerge(merge(TAILWIND_MERGE_EXTENSION, vuelessConfig.tailwindMerge));

export const { cx } = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(NESTED_COMPONENT_PATTERN_REG_EXP, ""),
  },
});

const getMergedConfig = createGetMergedConfig(cx);

export function clearTailwindSafelist() {
  process.env.VUELESS_SAFELIST = "";
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

  const safelist = [];

  const storybookColors = {
    colors: [...BRAND_COLORS, BRAND_COLOR, GRAY_COLOR],
    isComponentExists: true,
  };

  const componentNames = Object.keys(COMPONENTS);

  for await (const componentName of componentNames) {
    const { colors, isComponentExists } = await findComponentColors(componentName, vuelessFiles, vuelessConfigFiles);

    const defaultConfig = await retrieveComponentDefaultConfig(componentName, vuelessConfigFiles);
    const match = JSON.stringify(defaultConfig).match(/\{U\w+\}/g) || [];

    const nestedComponents = match.map((nestedComponentPattern) =>
      nestedComponentPattern.replaceAll(/[{}]/g, ""),
    );

    if (isComponentExists && colors.length) {
      const mergedConfig = await getMergedComponentConfig(componentName, vuelessConfigFiles);
      const componentSafelist = await getComponentSafelist(mergedConfig, colors);

      safelist.push(...componentSafelist);
    }

    if (isComponentExists && colors.length && nestedComponents.length) {
      for await (const nestedComponent of nestedComponents) {
        const mergedConfig = await getMergedComponentConfig(nestedComponent, vuelessConfigFiles);
        const nestedComponentSafelist = await getComponentSafelist(mergedConfig, colors);

        safelist.push(...nestedComponentSafelist);
      }
    }
  }

  const mergedSafelist = mergeSafelistPatterns(safelist);

  if (debug) {
    // eslint-disable-next-line no-console
    console.log("VUELESS_SAFELIST", mergedSafelist);
  }

  const globalSettings = cloneDeep(vuelessConfig);

  delete globalSettings.component;
  delete globalSettings.directive;
  delete globalSettings.tailwindMerge;

  process.env.VUELESS_GLOBAL_SETTINGS = globalSettings;
  process.env.VUELESS_SAFELIST = JSON.stringify(mergedSafelist);
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

function getSafelistItem(safelistClass, colorString) {
  const classes = safelistClass.split(TAILWIND_VARIANT_DELIMITER_REG_EXP);
  const mainClass = classes.at(-1);
  const pattern = mainClass.replace(DYNAMIC_COLOR_PATTERN, colorString);

  if (classes.length > 1) {
    const variantClasses = classes.slice(0, classes.length - 1);

    const variants =
      variantClasses.length > 1
        ? [variantClasses.join(TAILWIND_VARIANT_DELIMITER)].flat()
        : [variantClasses.join()].flat();

    return { pattern, variants };
  } else {
    return { pattern };
  }
}

async function getComponentSafelist(mergedConfig, colors) {
  const colorString = `(${colors.join("|")})`;

  return getSafelistClasses(mergedConfig).map((safelistClass) =>
    getSafelistItem(safelistClass, colorString),
  );
}

async function getMergedComponentConfig(componentName, vuelessConfigFiles) {
  const isStrategyValid =
    vuelessConfig.strategy && Object.values(STRATEGY_TYPE).includes(vuelessConfig.strategy);

  return getMergedConfig({
    defaultConfig: await retrieveComponentDefaultConfig(componentName, vuelessConfigFiles),
    globalConfig: vuelessConfig.component?.[componentName] || {},
    vuelessStrategy: isStrategyValid ? vuelessConfig.strategy : STRATEGY_TYPE.merge,
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
  const defaultColor = mergedComponentConfig.defaults?.color || vuelessConfig.brand || "";
  const colors = new Set();

  if (defaultColor && defaultColor !== "grayscale") {
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
      (color) => color && [...BRAND_COLORS, BRAND_COLOR, GRAY_COLOR].includes(color),
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
  const componentSafelistColors = vuelessConfig.component?.[componentName]?.safelistColors || [];

  return [...globalSafelistColors, ...componentSafelistColors];
}

/**
 Combine collected tailwind patterns from different components into groups.
 */
function mergeSafelistPatterns(safelist) {
  const safelistData = getSafelistData(safelist);
  const mergedColorsSafelist = mergeSafelistColors(safelistData);

  return mergeSafelistVariants(mergedColorsSafelist).map((item) => {
    const pattern = `${item.property}(${item.colorPattern})-(${Array.from(item.shades).join("|")})`;
    const safelistItem = { pattern };

    if (item.variants) {
      safelistItem.variants = item.variants;
    }

    return safelistItem;
  });
}

function getSafelistData(safelist) {
  return safelist.map((safelistItem) => {
    const matchGroupStart = 1;
    const matchGroupEnd = 4;
    const safelistItemRegExp = new RegExp(/^(.*-)\((.*)\)-(\d+(?:\/\d+)?)$/);

    const [property, colorPattern, colorShade] = safelistItem.pattern
      .match(safelistItemRegExp)
      .slice(matchGroupStart, matchGroupEnd);

    const [shade] = colorShade.split(TAILWIND_COLOR_OPACITY_DELIMITER);

    return {
      property,
      colorPattern,
      variants: safelistItem.variants,
      shades: new Set([shade]),
    };
  });
}

function mergeSafelistColors(safelistData) {
  const mergedSafelist = [];

  safelistData.forEach((currentSafelistItem, currentIndex) => {
    const duplicateIndex = mergedSafelist.findIndex((safelistItem, index) => {
      const isSameItem = index === currentIndex;
      const isSameProperty = safelistItem.property === currentSafelistItem.property;
      const isSameVariants = isEqual(safelistItem.variants, currentSafelistItem.variants);

      const currentItemColors = currentSafelistItem.colorPattern.split("|");
      const safelistColors = safelistItem.colorPattern.split("|");

      const isIncludesColors =
        safelistItem.colorPattern === currentSafelistItem.colorPattern ||
        currentItemColors.some((color) => safelistColors.includes(color)) ||
        safelistColors.some((color) => currentItemColors.includes(color));

      return !isSameItem && isSameProperty && isSameVariants && isIncludesColors;
    });

    if (!~duplicateIndex) {
      mergedSafelist.push(currentSafelistItem);
    } else {
      const mergedColors = [
        ...new Set([
          ...currentSafelistItem.colorPattern.split("|"),
          ...mergedSafelist[duplicateIndex].colorPattern.split("|"),
        ]),
      ];

      mergedSafelist[duplicateIndex].colorPattern = mergedColors.join("|");
      mergedSafelist[duplicateIndex].shades.add(
        ...currentSafelistItem.shades,
        ...mergedSafelist[duplicateIndex].shades,
      );
    }
  });

  return mergedSafelist;
}

function mergeSafelistVariants(safelistData) {
  safelistData.forEach((currentItem, currentIndex) => {
    if (!currentItem.variants) return;

    const duplicateIndex = safelistData.findIndex((item, index) => {
      const isSameItem = index === currentIndex;
      const isSameProperty = item.property === currentItem.property;
      const isSameColors = item.colorPattern === currentItem.colorPattern;
      const isSameShades = isEqual(item.shades, currentItem.shades);

      return !isSameItem && isSameProperty && isSameColors && isSameShades;
    });

    if (~duplicateIndex) {
      const currentItemVariants = currentItem.variants;
      const foundItemVariants = safelistData[duplicateIndex].variants || [];

      safelistData[duplicateIndex].variants = [
        ...new Set([...currentItemVariants, ...foundItemVariants]),
      ];
      safelistData.splice(currentIndex, 1);
    }
  });

  return safelistData;
}
