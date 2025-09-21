import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";

import { removeFolderIfEmpty } from "./helper.js";
import { getVuelessConfig } from "./vuelessConfig.js";

import {
  CACHE_DIR,
  COMPONENTS,
  TEXT_COLOR,
  INHERIT_COLOR,
  PRIMARY_COLOR,
  GRAYSCALE_COLOR,
  VUELESS_CACHE_DIR,
} from "../../constants.js";
import { buildWebTypes } from "./webTypes.js";

/* local constants */
const SAFE_COLORS = [PRIMARY_COLOR, GRAYSCALE_COLOR, INHERIT_COLOR, TEXT_COLOR];
const OPTIONAL_MARK = "?";
const CLOSING_BRACKET = "}";
const IGNORE_PROP = "@ignore";
const CUSTOM_PROP = "@custom";

/* regular expressions */
const PROPS_INTERFACE_REG_EXP = /export\s+interface\s+Props(?:<[^>]+>)?\s*{([^}]*)}/s;
const UNION_SYMBOLS_REG_EXP = /[?|:"|;]/g;
const WORD_IN_QUOTE_REG_EXP = /"([^"]+)"/g;

/**
 * Updates custom PropTypes for components based on provided configuration and colors.
 *
 * @param {Object} options Configuration options.
 * @param {string} options.vuelessSrcDir The source directory for Vueless components.
 * @param {string} options.basePath The base path for retrieving the Vueless configuration file.
 * @return {Promise<void>} Resolves when custom PropTypes for all components are updated successfully.
 */
export async function setCustomPropTypes({ vuelessSrcDir, basePath } = {}) {
  const vuelessConfig = await getVuelessConfig(basePath);

  const hasCustomColors = vuelessConfig.colors?.length;
  const hasCustomColorProp = !!Object.values(vuelessConfig.components || {}).find(
    (component) => component.props?.color,
  );

  let componentsWithColorProp = [];

  /* Build web-types.json to get list of components with color prop */
  if (hasCustomColors || hasCustomColorProp) {
    await buildWebTypes({ vuelessSrcDir, basePath });

    componentsWithColorProp = await getComponentsWithColors();
  }

  for await (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
    let componentGlobalConfig = vuelessConfig.components?.[componentName];
    const hasDefaultColorProp = componentsWithColorProp.some((item) => item.name === componentName);

    /* Skip components without props and without global colors in config */
    if (!componentGlobalConfig?.props && !(hasCustomColors && hasDefaultColorProp)) {
      continue;
    }

    /* Add colors to the default or custom color prop */
    if (componentGlobalConfig?.props?.color || (hasCustomColors && hasDefaultColorProp)) {
      // eslint-disable-next-line prettier/prettier
      const defaultColors = componentsWithColorProp.find((component) => component.name === componentName)?.colors || [];
      const safelistedColors = defaultColors.filter((color) => SAFE_COLORS.includes(color));

      componentGlobalConfig = {
        ...(componentGlobalConfig || {}),
        props: {
          ...(componentGlobalConfig?.props || {}),
          color: {
            ...(componentGlobalConfig?.props?.color || {}),
            values: [
              ...new Set([
                ...(componentGlobalConfig?.props?.color?.values || []),
                ...(vuelessConfig.colors || []),
                ...safelistedColors,
              ]),
            ],
          },
        },
      };
    }

    const cachePath = path.join(vuelessSrcDir, componentDir);

    await cacheComponentTypes(cachePath);
    await modifyComponentTypes(cachePath, componentGlobalConfig.props);
  }
}

/**
 * Removes custom prop types definitions for components.
 *
 * @param {string} srcDir - The source directory containing the component directories.
 * @return {Promise<void>} - A promise that resolves when custom prop types have been removed.
 */
export async function removeCustomPropTypes(srcDir) {
  for await (const componentDir of Object.values(COMPONENTS)) {
    await restoreComponentTypes(path.join(srcDir, componentDir));
    await clearComponentTypesCache(path.join(srcDir, componentDir));
  }
}

/**
 * Retrieves a list of components that have a "color" prop from the `web-types.json` file.
 *
 * @return {Promise<Array<string>>} A promise that resolves with an array of component names.
 */
async function getComponentsWithColors() {
  const webTypesPath = path.join(VUELESS_CACHE_DIR, "web-types.json");

  if (!existsSync(webTypesPath)) {
    return [];
  }

  const webTypesContent = await fs.readFile(webTypesPath, "utf8");
  const webTypes = JSON.parse(webTypesContent);

  if (!webTypes.contributions?.html?.tags) {
    return [];
  }

  return webTypes.contributions.html.tags
    .filter((component) => component?.attributes.some((attribute) => attribute.name === "color"))
    .map((component) => ({
      name: component.name,
      colors: component.attributes.find((attribute) => attribute.name === "color")?.enum,
    }));
}

/**
 * Caches the component types by copying a source file to a specified cache directory.
 *
 * @param {string} filePath - The directory path where the source file is located and the cache directory will be created.
 * @return {Promise<void>} A promise that resolves when the file has been successfully copied, or immediately if no action is taken.
 */
async function cacheComponentTypes(filePath) {
  const cacheDir = path.join(filePath, CACHE_DIR);
  const sourceFile = path.join(filePath, "types.ts");
  const destFile = path.join(cacheDir, "types.ts");

  if (existsSync(destFile) || !existsSync(sourceFile)) {
    return;
  }

  if (!existsSync(cacheDir)) {
    await fs.mkdir(cacheDir);
  }

  await fs.cp(sourceFile, destFile);
}

/**
 * Clears the cached component types by removing the specified cache file
 * and deleting the corresponding folder if it is empty.
 *
 * @param {string} filePath - The base file path where the cache directory resides.
 * @return {Promise<void>} A promise that resolves when the cache has been cleared.
 */
async function clearComponentTypesCache(filePath) {
  const cacheDir = path.join(filePath, CACHE_DIR);
  const sourceFile = path.join(cacheDir, "types.ts");

  if (existsSync(sourceFile)) {
    await fs.rm(sourceFile, { force: true });
  }

  await removeFolderIfEmpty(cacheDir);
}

/**
 * Restores the component type definitions by copying a cached file to the destination.
 *
 * @param {string} filePath - The directory path where the component types should be restored.
 * This path serves as the base for locating the cached file and the destination file.
 * @return {Promise<void>} A promise that resolves when the component types have been successfully restored.
 */
async function restoreComponentTypes(filePath) {
  const cacheDir = path.join(filePath, CACHE_DIR);
  const sourceFile = path.join(cacheDir, "types.ts");
  const destFile = path.join(filePath, "types.ts");

  if (existsSync(sourceFile)) {
    await fs.copyFile(sourceFile, destFile);
  }
}

/**
 * Extracts and processes the values from multiple lines based on the given indices.
 *
 * @param {Array<string>} lines - The array of lines to process.
 * @param {number} propIndex - The index from which to start slicing the lines.
 * @param {number} propEndIndex - The index until which to slice the lines (inclusive).
 * @return {Array<string>} An array of strings with processed values, trimmed of unnecessary symbols.
 */
function getMultiLineUnionValues(lines, propIndex, propEndIndex) {
  return lines
    .slice(propIndex)
    .slice(1, propEndIndex + 1)
    .map((item) => item.replace(UNION_SYMBOLS_REG_EXP, "").trim());
}

/**
 * Extracts and returns inline union values from the specified lines of text,
 * based on provided property indices.
 *
 * @param {string[]} lines - The array of string lines to extract union values from.
 * @param {number} propIndex - The starting index in the lines array from where extraction begins.
 * @param {number} propEndIndex - The ending index in the lines array up to which extraction is performed.
 * @return {string[]} An array of extracted union values, or an empty array if no matches are found.
 */
function getInlineUnionValues(lines, propIndex, propEndIndex) {
  const types = lines
    .slice(propIndex)
    .slice(0, propEndIndex + 1)
    .at(0)
    .match(WORD_IN_QUOTE_REG_EXP);

  return types ? types.map((value) => value.replace(/"/g, "")) : [];
}

/**
 * Updates or add a prop types dynamically.
 * @param {string} filePath - The path to the TypeScript file.
 * @param {Array} props - Array of prop objects to add or update.
 */
async function modifyComponentTypes(filePath, props) {
  try {
    const targetFile = path.join(filePath, "types.ts");

    /* Read `types.ts` and split it by lines. */
    let fileContent = await fs.readFile(targetFile, "utf-8");
    const propsInterface = fileContent.match(PROPS_INTERFACE_REG_EXP)?.at(0)?.trim();

    /* Remove props interface and double returns from fileContent */
    fileContent = fileContent.replace(propsInterface, "").replace(/\n\s*\n/g, "\n");

    const lines = propsInterface.split("\n");

    for (const name in props) {
      const { type = "string", values = [], description, required, ignore } = props[name];

      /* Find line with prop. */
      const propRegex = new RegExp(`^\\s*${name}[?:]?\\s*:`);
      const propIndex = lines.findIndex((line) => propRegex.test(line));
      const propEndIndex = lines.slice(propIndex).findIndex((line) => line.endsWith(";"));
      const propTypes = propEndIndex
        ? getMultiLineUnionValues(lines, propIndex, propEndIndex)
        : getInlineUnionValues(lines, propIndex, propEndIndex);

      const defaultUnionType = propTypes.map((value) => `"${value}"`).join(" | ");

      /* Prepare prop params. */
      const uniqueValues = [...new Set(values)];
      const isAssignableValue = uniqueValues.every((value) => propTypes.includes(value));
      const unionType = uniqueValues.map((value) => `"${value}"`).join(" | ");
      const userOptionalMark = required ? "" : OPTIONAL_MARK;
      const defaultOptionalMark = lines[propIndex]?.includes(OPTIONAL_MARK) ? OPTIONAL_MARK : "";
      const optionalMark = required === undefined ? defaultOptionalMark : userOptionalMark;

      const isExtendOnly = lines
        .slice(propIndex - 2, propIndex)
        .join("")
        .includes("@extendOnly");

      const propDescription = description?.replaceAll(/[\n\s]+/g, " ").trim() || "–"; // removes new lines and double spaces.
      const propType = unionType.length ? unionType : type;

      /* Add ignore JSDoc property. */
      if (ignore) {
        const ignoreDefinition = [`   * ${IGNORE_PROP}`, `   */`];
        const deleteLinesCount = lines[propIndex - 2].includes(IGNORE_PROP) ? 2 : 1;

        lines.splice(propIndex - deleteLinesCount, deleteLinesCount, ...ignoreDefinition);
      }

      /* Check if the prop type already exists. */
      if (~propIndex) {
        if (unionType.length && (isAssignableValue || !isExtendOnly)) {
          // Remove multiline union types;
          lines.splice(propIndex + 1, propEndIndex);

          lines.splice(propIndex, 1, `  ${name}${defaultOptionalMark}: ${propType};`);
        }

        if (unionType.length && isExtendOnly && !isAssignableValue) {
          // eslint-disable-next-line no-console
          console.warn(`${unionType} is not assignable to type ${defaultUnionType}.`);
        }

        const isCustomProp = lines[propIndex - 2].includes(CUSTOM_PROP);

        if (!isCustomProp && (type || description || required)) {
          // eslint-disable-next-line no-console, prettier/prettier
          console.warn("Changing of prop type, description or required are not allowed for the default props.");
        }

        continue;
      }

      /* Add new prop. */
      const closingBracketIndex = lines.findIndex((line) => line.trim() === CLOSING_BRACKET);
      const propDefinition = [
        "",
        `  /**`,
        `   * ${propDescription}`,
        `   * ${CUSTOM_PROP}`,
        `   */`,
        `  ${name}${optionalMark}: ${type};`,
      ];

      lines.splice(closingBracketIndex, 0, ...propDefinition);
    }

    lines.unshift(fileContent);

    /* Update `types.ts` file. */
    await fs.writeFile(targetFile, lines.join("\n"), "utf-8");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error updating file:", error.message, filePath);
  }
}
