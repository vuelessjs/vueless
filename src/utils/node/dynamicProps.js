import fs from "fs/promises";
import { existsSync } from "fs";
import path from "node:path";

import { vuelessConfig } from "./vuelessConfig.js";

import { COMPONENTS, VUELESS_DIR, VUELESS_LOCAL_DIR } from "../../constants.js";

const OPTIONAL_MARK = "?";
const CLOSING_BRACKET = "}";
const IGNORE_PROP = "@ignore";
const CUSTOM_PROP = "@custom";

const PROPS_INTERFACE_REG_EXP = /export\s+interface\s+Props\s*{([^}]*)}/s;
const UNION_SYMBOLS_REG_EXP = /[?|:"|;]/g;
const WORD_IN_QUOTE_REG_EXP = /"([^"]+)"/g;

export async function setCustomPropTypes(isVuelessEnv) {
  const srcDir = isVuelessEnv ? VUELESS_LOCAL_DIR : VUELESS_DIR;

  for await (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
    const componentGlobalConfig = vuelessConfig.component?.[componentName];
    const customProps = componentGlobalConfig && componentGlobalConfig.props;
    const isHiddenStories = componentGlobalConfig && componentGlobalConfig.storybook === false;

    if (customProps && !isHiddenStories) {
      await cacheComponentTypes(path.join(srcDir, componentDir));
      await modifyComponentTypes(
        path.join(srcDir, componentDir),
        vuelessConfig.component?.[componentName]?.props,
      );
    }
  }
}

export async function removeCustomPropTypes(isVuelessEnv) {
  const srcDir = isVuelessEnv ? VUELESS_LOCAL_DIR : VUELESS_DIR;

  for await (const componentDir of Object.values(COMPONENTS)) {
    await restoreComponentTypes(path.join(srcDir, componentDir));
    await clearComponentTypesCache(path.join(srcDir, componentDir));
  }
}

async function cacheComponentTypes(filePath) {
  const cacheDir = path.join(filePath, ".cache");
  const sourceFile = path.join(filePath, "types.ts");
  const destFile = path.join(cacheDir, "types.ts");

  if (existsSync(cacheDir)) {
    return;
  }

  if (existsSync(sourceFile)) {
    await fs.mkdir(cacheDir);
    await fs.cp(sourceFile, destFile);
  }
}

async function clearComponentTypesCache(filePath) {
  await fs.rm(path.join(filePath, ".cache"), { force: true, recursive: true });
}

async function restoreComponentTypes(filePath) {
  const cacheDir = path.join(filePath, ".cache");
  const sourceFile = path.join(cacheDir, "types.ts");
  const destFile = path.join(filePath, "types.ts");

  if (existsSync(sourceFile)) {
    await fs.cp(sourceFile, destFile);
  }
}

function getMultiLineUnionValues(lines, propIndex, propEndIndex) {
  return lines
    .slice(propIndex)
    .slice(1, propEndIndex + 1)
    .map((item) => item.replace(UNION_SYMBOLS_REG_EXP, "").trim());
}

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

    for (const prop of props) {
      const { name, type, values = [], description, required, ignore } = prop;

      if (!name) return;

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
        if (unionType.length && isAssignableValue) {
          // Remove multiline union types;
          lines.splice(propIndex + 1, propEndIndex);

          lines.splice(propIndex, 1, `  ${name}${defaultOptionalMark}: ${propType};`);
        }

        if (unionType.length && !isAssignableValue) {
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
    console.error("Error updating file:", error.message);
  }
}
