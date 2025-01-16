import path from "node:path";

export function replaceRelativeImports(componentName, filePath, fileContent) {
  const isTopLevelFile = path.dirname(filePath).endsWith(componentName);
  const contentLines = fileContent.split("\n");

  return contentLines.map((line) => replaceRelativeLineImports(line, isTopLevelFile)).join("\n");
}

function replaceRelativeLineImports(line, isTopLevelFile) {
  const importRegex = /import\s+(?:[\w\s{},*]+)\s+from\s+(['"])(\.\.?\/.*?)(\.[tj]s)?\1(?!\?)/g;

  const isTopLevelLocalImport = isTopLevelFile && !line.includes("../");
  const isInnerLocalImport =
    !isTopLevelFile && (line.includes("../") || line.includes("./")) && !line.includes("../../");

  if (isTopLevelLocalImport || isInnerLocalImport) {
    return line;
  }

  return line.replace(importRegex, (match, quote, oldPath, ext) => {
    const isDefaultImport = match.includes("{");

    if (!isDefaultImport) {
      match = defaultToNamedImprot(match);
    }

    return match.replace(oldPath + (ext || ""), "vueless");
  });
}

function defaultToNamedImprot(importString) {
  const splittedImport = importString.split(" ");

  return splittedImport
    .map((importStringToken) => {
      if (importStringToken.includes("import")) {
        return `${importStringToken} { `;
      }

      if (importStringToken.includes("from")) {
        return ` } ${importStringToken} `;
      }

      return importStringToken;
    })
    .join("");
}
