import path from "node:path";
import { merge } from "lodash-es";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extendTailwindMerge } from "tailwind-merge";
import { isEqual, omit } from "lodash-es";
import { defineConfig } from "cva";

import { vuelessConfig } from "./vuelessConfig.js";
import { createGetMergedConfigFunction } from "./mergeConfigs.js";
import { getDefaultConfigJson, getDirFiles } from "./helper.js";
import {
  COMPONENTS,
  BRAND_COLORS,
  BRAND_COLOR,
  GRAY_COLOR,
  DYNAMIC_COLOR_PATTERN,
  TAILWIND_VARIANT_DELIMITER,
  TAILWIND_MERGE_EXTENSION,
  NESTED_COMPONENT_REG_EXP,
  TAILWIND_COLOR_OPACITY_DELIMITER,
  TAILWIND_VARIANT_DELIMITER_REG_EXP,
  STRATEGY_TYPE,
} from "../../constants.js";

const twMerge = extendTailwindMerge(merge(TAILWIND_MERGE_EXTENSION, vuelessConfig.tailwindMerge));

export const { cx } = defineConfig({
  hooks: {
    onComplete: (classNames) => twMerge(classNames).replace(NESTED_COMPONENT_REG_EXP, ""),
  },
});

const getMergedConfig = createGetMergedConfigFunction(cx);

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

  const storybookColors = {
    colors: [...BRAND_COLORS, BRAND_COLOR, GRAY_COLOR],
    isComponentExists: true,
  };
  const safelist = [];

  const componentNames = Object.keys(COMPONENTS);

  for await (const component of componentNames) {
    const defaultConfigPath = vuelessConfigFiles.find((file) =>
      isDefaultComponentConfig(file, component),
    );
    const defaultConfig = await readFile(path.join(process.cwd(), defaultConfigPath), {
      encoding: "utf-8",
    });
    const nestedComponents = (defaultConfig.match(/\{U\w+\}/g) || []).map(
      (nestedComponentPattern) => nestedComponentPattern.replaceAll(/[{}]/g, ""),
    );

    const { colors, isComponentExists } = isStorybookMode
      ? storybookColors
      : await findComponentColors(vuelessFiles, component);

    if (isComponentExists && colors.length) {
      const componentSafelist = await getComponentSafelist(component, {
        colors,
        vuelessConfigFiles,
        isVuelessEnv,
      });

      safelist.push(...componentSafelist);
    }

    if (isComponentExists && colors.length && nestedComponents.length) {
      for await (const nestedComponent of nestedComponents) {
        const nestedComponentSafelist = await getComponentSafelist(nestedComponent, {
          colors,
          vuelessConfigFiles,
          isVuelessEnv,
        });

        safelist.push(...nestedComponentSafelist);
      }
    }
  }

  const mergedSafelist = mergeSafelistPatterns(safelist);

  if (debug) {
    // eslint-disable-next-line no-console
    console.log("VUELESS_SAFELIST", mergedSafelist);
  }

  process.env.VUELESS_SAFELIST = JSON.stringify(mergedSafelist);
  process.env.VUELESS_STRATEGY = vuelessConfig.strategy || "";
}

function getSafelistClasses(config) {
  const safelistItems = [];

  for (const key in config) {
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

async function getComponentSafelist(componentName, { colors, vuelessConfigFiles }) {
  let defaultConfigPath = vuelessConfigFiles.find((file) =>
    isDefaultComponentConfig(file, componentName),
  );
  const customConfig = vuelessConfig.component?.[componentName] || {};
  let defaultConfig = {};

  if (defaultConfigPath) {
    const configPath = path.join(process.cwd(), defaultConfigPath);
    const defaultConfigContent = await readFile(configPath, { encoding: "utf-8" });

    defaultConfig = getDefaultConfigJson(defaultConfigContent);
  }

  const isStrategyValid =
    vuelessConfig.strategy && Object.values(STRATEGY_TYPE).includes(vuelessConfig.strategy);

  const vuelessStrategy = isStrategyValid ? vuelessConfig.strategy : STRATEGY_TYPE.merge;

  const mergedConfig = omit(
    getMergedConfig({ defaultConfig, globalConfig: customConfig, vuelessStrategy }),
    ["defaults"],
  );

  const colorString = `(${colors.join("|")})`;

  return getSafelistClasses(mergedConfig).map((safelistClass) =>
    getSafelistItem(safelistClass, colorString),
  );
}

async function findComponentColors(files, componentName) {
  const objectColorRegExp = new RegExp(/\bcolor\s*:\s*["']([^"'\s]+)["']/, "g");
  const singleColorRegExp = new RegExp(/\bcolor\s*=\s*["']([^"'\s]+)["']/);
  const ternaryColorRegExp = new RegExp(/\bcolor="[^']*'([^']*)'\s*:\s*'([^']*)'/);

  const brandColor = getComponentBrandColor(componentName);
  const colors = new Set();

  if (brandColor && brandColor !== "grayscale") {
    colors.add(brandColor);
  }

  getSafelistColorsFromConfig().forEach((color) => colors.add(color));

  let isComponentExists = false;

  for await (const file of files) {
    if (!existsSync(file)) continue;

    const fileContent = await readFile(file, "utf-8");
    const isDefaultConfig = isDefaultComponentConfig(file, componentName);
    const componentRegExp = new RegExp(`<${componentName}[^>]+>`, "g");
    const matchedComponent = fileContent.match(componentRegExp);

    if (!isComponentExists) {
      isComponentExists = Boolean(matchedComponent);
    }

    if (isDefaultConfig) {
      fileContent.match(objectColorRegExp)?.forEach((colorMatch) => {
        const [, color] = objectColorRegExp.exec(colorMatch) || [];

        colors.add(color);
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

function getComponentBrandColor(componentName) {
  const globalBrandColor = vuelessConfig.brand || "";
  const globalComponentConfig = vuelessConfig.component?.[componentName] || {};

  return vuelessConfig.component ? globalComponentConfig.defaults?.color : globalBrandColor;
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
  const componentSafelistColors =
    (vuelessConfig.component && vuelessConfig.component[componentName]?.safelistColors) || [];

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
