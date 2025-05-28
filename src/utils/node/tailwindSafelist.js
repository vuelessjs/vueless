import path from "node:path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { readFile, unlink, writeFile } from "node:fs/promises";
import { merge } from "lodash-es";

import { getDefaultComponentConfig, getMergedComponentConfig, getDirFiles } from "./helper.js";
import { vuelessConfig } from "./vuelessConfig.js";
import {
  COMPONENTS,
  INTERNAL_ENV,
  STORYBOOK_ENV,
  STATE_COLORS,
  COLOR_SHADES,
  PRIMARY_COLORS,
  NEUTRAL_COLORS,
  SYSTEM_CONFIG_KEY,
  DYNAMIC_COLOR_PATTERN,
  VUELESS_TAILWIND_SAFELIST,
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_NEUTRAL_COLOR,
} from "../../constants.js";

/**
 * Removes the Tailwind CSS safelist file if it exists.
 *
 * This method checks for the presence of a pre-defined safelist file in the
 * project directory. If the file is found, it deletes the file asynchronously.
 *
 * @return {Promise<void>} A promise that resolves after the safelist file is removed
 *                         or does nothing if the file does not exist.
 */
export async function clearTailwindSafelist() {
  const safelistPath = path.join(cwd(), VUELESS_TAILWIND_SAFELIST);

  if (existsSync(safelistPath)) {
    await unlink(safelistPath);
  }
}

/**
 * Creates a TailwindCSS safelist file based on the given environment, source directory, and target files.
 * The safelist includes classes and color variables essential for runtime color switching and component styles.
 *
 * @param {Object} options - The function options.
 * @param {string} options.env - Current environment, used to tailor safelist generation.
 * @param {string} options.srcDir - Source directory path containing `.vue` files.
 * @param {string[]} [options.targetFiles=[]] - Optional array of target file paths to include in the safelist generation.
 * @return {Promise<void>} A promise that resolves when the safelist file is successfully created and written to disk.
 */
export async function createTailwindSafelist({ env, srcDir, targetFiles = [] } = {}) {
  const isStorybookEnv = env === STORYBOOK_ENV;
  const isInternalEnv = env === INTERNAL_ENV;

  /* Safelist CSS classes from all components and their nested components. */
  let srcVueFiles = [];
  const vuelessVueFiles = await getDirFiles(srcDir, ".vue");

  if (!isInternalEnv) {
    const vueFiles = targetFiles.map((componentPath) => getDirFiles(componentPath, ".vue"));

    srcVueFiles = (await Promise.all(vueFiles)).flat();
  }

  const classes = await getComponentsSafelistClasses({
    files: [...srcVueFiles, ...vuelessVueFiles],
    env: { isStorybookEnv, isInternalEnv },
    srcDir,
  });

  /* Safelist all color shades to allow runtime color switching feature. */
  let runtimeColorCSSVariables = [];

  if (isStorybookEnv || isInternalEnv || vuelessConfig.runtimeColors?.length) {
    const colors = vuelessConfig.runtimeColors?.length
      ? vuelessConfig.runtimeColors
      : [...PRIMARY_COLORS, ...NEUTRAL_COLORS];

    runtimeColorCSSVariables = COLOR_SHADES.map((shade) => {
      return colors.map((color) => `--color-${color}-${shade}`).join("\n");
    });
  }

  /* Safelist primary and neutral color variables. */
  let brandColorCSSVariables = [];

  if (!isInternalEnv) {
    const colors = [
      vuelessConfig.primary ?? DEFAULT_PRIMARY_COLOR,
      vuelessConfig.neutral ?? DEFAULT_NEUTRAL_COLOR,
    ];

    brandColorCSSVariables = COLOR_SHADES.map((shade) => {
      return colors.map((color) => `--color-${color}-${shade}`).join("\n");
    });
  }

  /* Safelist all color variables to allow runtime color switching feature. */
  const lightThemeConfig = merge({}, DEFAULT_LIGHT_THEME, vuelessConfig.lightTheme);
  const darkThemeConfig = merge({}, DEFAULT_DARK_THEME, vuelessConfig.darkTheme);

  const themeCSSVariables = [
    ...Object.values(lightThemeConfig).map((value) => value),
    ...Object.values(darkThemeConfig).map((value) => value),
  ];

  const safelist = [
    ...new Set([
      ...classes,
      ...themeCSSVariables,
      ...brandColorCSSVariables,
      ...runtimeColorCSSVariables,
    ]),
  ];
  const safelistPath = path.join(cwd(), VUELESS_TAILWIND_SAFELIST);

  await writeFile(safelistPath, safelist.join("\n"));
}

/**
 * Asynchronously retrieves the safelist classes for components and nested components.
 * This involves reading configuration files, merging configurations, and generating safelisted
 * CSS classes based on component usage, environment conditions, and configured colors.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Array<string>} params.files - List of file paths to check for component usage.
 * @param {Object} params.env - Environment variables for distinguishing between different environments.
 * @param {boolean} params.env.isStorybookEnv - Indicates whether the function is running in a Storybook environment.
 * @param {boolean} params.env.isInternalEnv - Indicates whether the function is running in an internal environment.
 * @param {string} params.srcDir - The source directory path to search for configuration files.
 *
 * @return {Promise<Array<string>>} A promise that resolves to an array of safelisted CSS class names
 * for all matched components and nested components.
 */
async function getComponentsSafelistClasses({ files, env, srcDir }) {
  const { isStorybookEnv, isInternalEnv } = env;

  const vuelessConfigFiles = [
    ...(await getDirFiles(srcDir, "/config.ts")),
    ...(await getDirFiles(srcDir, "/config.js")),
  ].flat();

  const classes = [];
  const colors = vuelessConfig.colors?.length ? vuelessConfig.colors : STATE_COLORS;
  const componentNames = Object.keys(COMPONENTS);

  for await (const componentName of componentNames) {
    const isCurrentComponentUsed = await isComponentUsed(componentName, files);

    const defaultConfig = await retrieveComponentDefaultConfig(componentName, vuelessConfigFiles);
    const match = JSON.stringify(defaultConfig).match(/\{U\w+\}/g) || [];

    /* parent component */
    if (isCurrentComponentUsed || isStorybookEnv || isInternalEnv) {
      const mergedConfig = await getMergedComponentConfig(componentName);
      const componentSafelistClasses = getSafelistClasses(mergedConfig, colors);

      classes.push(...componentSafelistClasses);
    }

    /* nested components */
    const nestedComponents = match.map((nestedComponentPattern) =>
      nestedComponentPattern.replaceAll(/[{}]/g, ""),
    );

    if ((isCurrentComponentUsed || isStorybookEnv || isInternalEnv) && nestedComponents.length) {
      for await (const nestedComponent of nestedComponents) {
        const mergedConfig = await getMergedComponentConfig(nestedComponent);
        const nestedComponentSafelistClasses = getSafelistClasses(mergedConfig, colors);

        classes.push(...nestedComponentSafelistClasses);
      }
    }
  }

  return classes;
}

/**
 * Extracts and consolidates a safelist of classes from the provided configuration object.
 *
 * @param {Object} config - The configuration object containing classes to safelist.
 * @return {string[]} An array of safelisted class names after processing the configuration.
 */
function getClassesToSafelist(config) {
  const safelistItems = [];

  for (const key in config) {
    if (key === SYSTEM_CONFIG_KEY.defaults) continue;

    if (Object.hasOwn(config, key)) {
      const classes = config[key];

      if (typeof classes === "object" && Array.isArray(classes)) {
        safelistItems.push(...classes.map(getClassesToSafelist));
      }

      if (typeof classes === "object" && !Array.isArray(classes)) {
        safelistItems.push(...getClassesToSafelist(classes));
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

/**
 * Generates a set of safelisted CSS classes by replacing dynamic color patterns
 * in the provided safelist with specified colors and a default color.
 *
 * @param {Object} mergedConfig - The configuration object, which contains settings and defaults.
 * @param {Array<string>} colors - An array of color strings to replace dynamic color patterns.
 * @return {Set<string>} A set of safelisted CSS classes with replaced dynamic colors.
 */
function getSafelistClasses(mergedConfig, colors) {
  const classes = new Set();
  const defaultColor = mergedConfig.defaults?.color || "";

  getClassesToSafelist(mergedConfig).map((safelistClass) => {
    [...colors, defaultColor].forEach((color) => {
      classes.add(safelistClass.replace(DYNAMIC_COLOR_PATTERN, color));
    });
  });

  return classes;
}

/**
 * Retrieves the default configuration for a specific component.
 *
 * @param {string} componentName - The name of the component whose default configuration is to be retrieved.
 * @param {string[]} vuelessConfigFiles - An array of file paths to search for the component's configuration file.
 * @return {Promise<Object>} A promise that resolves to the component's default configuration object.
 */
async function retrieveComponentDefaultConfig(componentName, vuelessConfigFiles) {
  const configPath = vuelessConfigFiles.find((filePath) => {
    return filePath.includes(`${COMPONENTS[componentName]}/`);
  });

  return await getDefaultComponentConfig(componentName, configPath);
}

/**
 * Checks if a specific component is used within a collection of files.
 *
 * @param {string} componentName - The name of the component to search for.
 * @param {string[]} files - An array of file paths to search for the component usage.
 * @return {Promise<boolean>} A promise that resolves to true if the component is used in any of the files, otherwise false.
 */
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
