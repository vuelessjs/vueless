import path from "path";
import { globbySync } from "globby";
import * as chokidar from "chokidar";
import { parse } from "vue-docgen-api";
import * as fs from "fs";
import mkdirp from "mkdirp";
import _ from "lodash";
import merge from "lodash.merge";

export default async function build(config) {
  config.componentsRoot = path.resolve(config.cwd, config.componentsRoot);
  config.outFile = path.resolve(config.cwd, config.outFile);

  // then create the watcher if necessary
  const { watcher, componentFiles } = getSources(config.components, config.componentsRoot);

  // eslint-disable-next-line no-console
  console.log("Building web-types to " + config.outFile);

  const cache = {};
  const buildWebTypesBound = rebuild.bind(null, config, componentFiles, cache, watcher);

  try {
    await buildWebTypesBound();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error building web-types: " + e.message);
    await watcher.close();

    return;
  }

  if (config.watch) {
    watcher
      .on("add", buildWebTypesBound)
      .on("change", buildWebTypesBound)
      .on("unlink", async (filePath) => {
        // eslint-disable-next-line no-console
        console.log("Rebuilding on file removal " + filePath);
        delete cache[filePath];
        await writeDownWebTypesFile(config, Object.values(cache), config.outFile);
      });
  } else {
    await watcher.close();
  }
}

function getSources(components, cwd) {
  const watcher = chokidar.watch(components, { cwd });

  const allComponentFiles = globbySync(components, { cwd });

  return { watcher, componentFiles: allComponentFiles };
}

async function rebuild(config, files, cachedContent, watcher, changedFilePath) {
  const cacheWebTypesContent = async (filePath) => {
    cachedContent[filePath.replace(/\\/g, "/")] = await extractInformation(
      path.join(config.componentsRoot, filePath),
      config,
    );

    return true;
  };

  if (changedFilePath) {
    // eslint-disable-next-line no-console
    console.log("Rebuilding on update file " + changedFilePath);

    try {
      // if in chokidar mode (watch), the path of the file that was just changed
      // is passed as an argument. We only affect the changed file and avoid re-parsing the rest
      await cacheWebTypesContent(changedFilePath);
    } catch (e) {
      throw new Error(
        `Error building file ${config.outFile} when file ${changedFilePath} has changed: ${e.message}`,
      );
    }
  } else {
    try {
      // if we are initializing the current file, parse all components
      await Promise.all(files.map(cacheWebTypesContent));
    } catch (e) {
      throw new Error(`Error building file ${config.outFile}: ${e.message}`);
    }
  }

  // and finally save all concatenated values to the markdown file
  await writeDownWebTypesFile(config, Object.values(cachedContent), config.outFile);
}

async function writeDownWebTypesFile(config, definitions, destFilePath) {
  const destFolder = path.dirname(destFilePath);

  await mkdirp(destFolder);
  let writeStream = fs.createWriteStream(destFilePath);
  const contents = {
    framework: "vue",
    name: config.packageName,
    version: config.packageVersion,
    contributions: {
      html: {
        "description-markup": config.descriptionMarkup,
        "types-syntax": config.typesSyntax,
        tags: _(definitions)
          .flatMap((d) => d.tags || [])
          .orderBy("name", "asc")
          .value(),
        attributes: _(definitions)
          .flatMap((d) => d.attributes || [])
          .orderBy("name", "asc")
          .value(),
        "vue-filters": _(definitions)
          .flatMap((d) => d["vue-filters"] || [])
          .orderBy("name", "asc")
          .value(),
      },
    },
  };

  const html = contents.contributions.html;

  if (html.tags?.length == 0) html.tags = undefined;
  if (html.attributes?.length == 0) html.attributes = undefined;
  if (html["vue-filters"]?.length == 0) html["vue-filters"] = undefined;

  writeStream.write(JSON.stringify(contents, null, 2));

  // close the stream
  writeStream.close();
}

function ensureRelative(path) {
  // The .replace() is a fix for paths that end up like "./src\\components\\General\\VerticalButton.vue" on windows machines.
  return (path.startsWith("./") || path.startsWith("../") ? path : "./" + path).replace(/\\/g, "/");
}

async function extractInformation(absolutePath, config) {
  const doc = await parse(absolutePath, config.apiOptions);
  const name = doc.name || doc.displayName;
  let description = doc.description?.trim() ?? "";

  // Get default component config
  const configPath = path.join(path.dirname(absolutePath), "configs/default.config.js");
  let globalConfig = null;
  let defaultConfig = null;
  let defaultValues = null;

  if (fs.existsSync(configPath)) {
    const defaultConfigFile = fs.readFileSync(configPath).toString();
    const globalConfigFile = fs.readFileSync(config.cwd + "/vueless.config.js").toString();

    defaultConfig = getDefaultConfigJson(defaultConfigFile);
    globalConfig = getGlobalConfigJson(globalConfigFile, name);
    defaultValues = merge(defaultConfig.defaultVariants, globalConfig[name]?.defaultVariants);
  }

  function getDefaultConfigJson(fileContents) {
    const objectStartIndex = fileContents.indexOf("{");
    const objectString = fileContents.substring(objectStartIndex).replace("};", "}");

    return eval("(" + objectString + ")"); // Converting into JS object
  }

  function getGlobalConfigJson(fileContents, componentName) {
    const startIndex = fileContents.indexOf(`${componentName}:`);
    const endIndex = fileContents.indexOf("}", startIndex) + 1;
    const rawString = fileContents.slice(startIndex, endIndex);

    // If the stings are present in config but commented - remove them
    const cleanContents = rawString.replace(/\/\/.*\n?/g, "");

    // Check if final JSON string is valid: TODO: find better solution
    if (!cleanContents.includes("}")) return {};

    const jsonString = `{${rawString}\n}}`
      .replace(/'/g, '"')
      .replace(/(\w+)\s*:/g, '"$1":')
      .replace(/,\s*}/g, "}");

    return JSON.parse(jsonString);
  }

  doc.docsBlocks?.forEach((block) => {
    if (description.length > 0) {
      if (config.descriptionMarkup === "html") {
        description += "<br/><br/>";
      } else {
        description += "\n\n";
      }
    }

    description += block;
  });

  return {
    tags: [
      {
        name,
        description,
        attributes: doc.props?.map((prop) => ({
          name: prop.name,
          required: prop.required,
          description: prop.description,
          value: {
            kind: "expression",
            type: prop.values ? `'${prop.values.join("' | '")}'` : prop.type?.name ?? "any",
          },
          default: (defaultValues && defaultValues[prop.name]) || prop.defaultValue?.value,
        })),
        events: doc.events?.map((event) => ({
          name: event.name,
          description: event.description,
        })),
        slots: doc.slots?.map((slot) => ({
          name: slot.name,
          description: slot.description,
        })),
        source: {
          module: ensureRelative(path.relative(config.cwd, absolutePath)).substring(1), // TODO: maybe substring should be removed when it turns to package
          symbol: doc.exportName,
        },
      },
    ],
  };
}
