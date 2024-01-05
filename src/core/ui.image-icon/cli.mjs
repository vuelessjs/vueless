/* eslint-disable no-console */

import fs from "fs";
import path from "path";
import { createRequire } from "node:module";

/*
  This scrypt find icon names from the UIcon prop across the project
  and copy SVG icons from the default UIcon icons library (@material-symbols)
  to the "assets/images/.generated" folder.

  Those icons will be used only in the build stage.
  The script is needed to avoid all @material-symbols icons in the project assets.
 */

const args = parseArgs();

// generate icons for a "mono" library by default
args["mono"] = args["mono"] || true;

const DESTINATION_DIR = "./src/assets/images/.generated";
const PACKAGE_PATH = "@material-symbols/svg-400/rounded";

if (fs.existsSync(DESTINATION_DIR)) {
  fs.rmSync(DESTINATION_DIR, { recursive: true, force: true });
}

if (args.mono) {
  const monoFiles = getFiles(".mono", ".vue");

  findAndCopyIcons(monoFiles);
}

if (args.src) {
  const srcVueFiles = getFiles("src", ".vue");
  const srcJsFiles = getFiles("src", ".js");

  findAndCopyIcons([...srcVueFiles, ...srcJsFiles]);
}

if (args.storybook) {
  const monoFiles = getFiles(".mono", ".stories.js");

  findAndCopyIcons(monoFiles);
}

function findAndCopyIcons(files) {
  files.forEach(async (file) => {
    const fileContents = fs.readFileSync(file).toString();

    const regexObject = /iconName:\s*"([^"]+)"/gs;
    const matchObjectIterator = fileContents.matchAll(regexObject);

    for (const match of matchObjectIterator) {
      try {
        copyFile(match[1]);
      } catch (error) {
        // console.log(error);
      }
    }

    const regexExternalProps = /icon-name="([^"]+)"/gs;
    const matchExternalPropsIterator = fileContents.matchAll(regexExternalProps);

    for (const match of matchExternalPropsIterator) {
      try {
        copyFile(match[1]);
      } catch (error) {
        // console.log(error);
      }
    }

    const regexProps = /<UIcon[^>]+name="([^"]+)"/gs;
    const matchPropsIterator = fileContents.matchAll(regexProps);

    for (const match of matchPropsIterator) {
      try {
        copyFile(match[1]);
      } catch (error) {
        // console.log(error);
      }
    }

    const regexTernary = /<UIcon\s+:name="[^']*'([^']*)'\s*:\s*'([^']*)'/g;
    const matchIteratorTernary = fileContents.matchAll(regexTernary);

    for (const match of matchIteratorTernary) {
      try {
        copyFile(match[1]);
        copyFile(match[2]);
      } catch (error) {
        // console.log(error);
      }
    }
  });
}

function getFiles(dirPath, extension, fileList) {
  const files = fs.readdirSync(dirPath);

  fileList = fileList || [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fileList = getFiles(filePath, extension, fileList);
    } else if (file.endsWith(extension)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function copyFile(name) {
  name = name.toLowerCase();

  const require = createRequire(import.meta.url);
  const source = require.resolve(`${PACKAGE_PATH}/${name}.svg`);
  const destination = `${DESTINATION_DIR}/${PACKAGE_PATH}/${name}.svg`;

  if (fs.existsSync(destination)) {
    return;
  }

  const destDir = path.dirname(destination);

  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFile(source, destination, (err) => {
    err
      ? console.error(`Error copying icon "${name}":`, err)
      : console.log(`Icon "${name}" copied successfully!`);
  });
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsedArgs = {};

  let currentKey = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);

      parsedArgs[key] = true;
      currentKey = key;
    } else if (currentKey) {
      parsedArgs[currentKey] = arg;
      currentKey = null;
    }
  }

  return parsedArgs;
}
