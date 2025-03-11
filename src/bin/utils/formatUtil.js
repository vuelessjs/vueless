import path from "node:path";

import { VUELESS_LIBRARY } from "../../constants.js";

export function replaceRelativeImports(componentName, filePath, fileContent) {
  const isTopLevelFile = path.dirname(filePath).endsWith(componentName);
  const contentLines = fileContent.split("\n");

  return contentLines.map((line) => replaceRelativeLineImports(line, isTopLevelFile)).join("\n");
}

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
    return line.replace(multiLineImportRegExp, (match, quote, oldPath, ext) => {
      return match.replace(oldPath + (ext || ""), VUELESS_LIBRARY);
    });
  }

  return line.replace(importRegex, (match) => {
    return match.replaceAll(relativePathStartRegExp, `${VUELESS_LIBRARY}/`);
  });
}
