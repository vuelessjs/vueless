#!/usr/bin/env node

import path from "node:path";
import { cwd } from "node:process";
import { writeFile, rm, mkdir } from "node:fs/promises";

import { buildTSFile } from "../src/utils/node/helper.js";
import { VUELESS_CACHE_DIR } from "../src/constants.js";

const jsLocalePath = path.join(cwd(), VUELESS_CACHE_DIR, "locales", "en.js");
const tsLocalePath = path.join(cwd(), "src", "adapter.locale", "locales", "en.ts");
const jsonLocaleDirPath = path.join(cwd(), "dist", "locales");
const jsonLocalePath = path.join(jsonLocaleDirPath, "en.json");

await buildTSFile(tsLocalePath, jsLocalePath);

const { default: defaultEnLocale } = await import(jsLocalePath);

await mkdir(jsonLocaleDirPath, { recursive: true });
await writeFile(jsonLocalePath, JSON.stringify(defaultEnLocale), "utf-8");

await rm(jsLocalePath, { force: true });
