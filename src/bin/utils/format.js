import path from "node:path";

import { VUELESS_LIBRARY } from "../../constants.js";

/**
 * Replaces relative import paths in the provided file content based on the given component name and file path.
 *
 * @param {string} componentName - The name of the component, used to determine if the file is at the top level.
 * @param {string} filePath - The file path to check if the file is located at the top level of the component.
 * @param {string} fileContent - The content of the file where the relative import paths need to be replaced.
 * @return {string} The updated file content with the adjusted relative import paths.
 */
export function replaceRelativeImports(componentName, filePath, fileContent) {
  const isTopLevelFile = path.dirname(filePath).endsWith(componentName);
  const contentLines = fileContent.split("\n");

  return contentLines.map((line) => replaceRelativeLineImports(line, isTopLevelFile)).join("\n");
}

/**
 * Replaces relative import paths in a given line of code with a new base path for certain types of imports.
 *
 * @param {string} line - The line of code containing import statements to process.
 * @param {boolean} isTopLevelFile - Indicates if the file is a top-level file within the project structure.
 * @return {string} The modified line of code with adjusted import paths, or the original line if no changes are required.
 */
function replaceRelativeLineImports(line, isTopLevelFile) {
  const importRegex = /import\s+(?:[\w\s{},*]+)\s+from\s+(['"])(\.\.?\/.*?)(\.[tj]s)?\1(?!\?)/g;
  const multiLineImportRegExp = /from\s+(['"])(\.\.?\/.*?)(\.[tj]s)?\1(?!\?)/g; // Matches import's "from" part
  const relativePathStartRegExp = /(?:\.\.\/)+/g;

  const isTopLevelLocalImport = isTopLevelFile && !line.includes("../");
  const isInnerLocalImport =
    !isTopLevelFile && (line.includes("../") || line.includes("./")) && !line.includes("../../");

  if (isTopLevelLocalImport || isInnerLocalImport) {
    return line;
  }

  if (line.startsWith("}")) {
    return line.replace(multiLineImportRegExp, (match) => {
      return match.replace(relativePathStartRegExp, `${VUELESS_LIBRARY}/`);
    });
  }

  return line.replace(importRegex, (match) => {
    return match.replaceAll(relativePathStartRegExp, `${VUELESS_LIBRARY}/`);
  });
}
