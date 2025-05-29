#!/usr/bin/env node

import { writeFile, rm, mkdir } from "node:fs/promises";

import { buildTSFile } from "../src/utils/node/helper.js";
import path from "node:path";

import { VUELESS_CACHE_DIR } from "../src/constants.js";

const LOCALES_JS_PATH = path.join(VUELESS_CACHE_DIR, "locales/en.js");
const LOCALES_TS_PATH = "src/adatper.locale/locales/en.ts";
const JSON_LOCALES_DIR = "dist/locales";
const IMPORT_LOCALES_PATH = path.join(process.cwd(), LOCALES_JS_PATH);
const DIST_LOCALES_PATH = path.join(JSON_LOCALES_DIR, "en.json");

await buildTSFile(LOCALES_TS_PATH, LOCALES_JS_PATH);

const defaultEnLocale = (await import(IMPORT_LOCALES_PATH)).default;

await mkdir(JSON_LOCALES_DIR, { recursive: true });
await writeFile(DIST_LOCALES_PATH, JSON.stringify(defaultEnLocale), "utf-8");

await rm(LOCALES_JS_PATH, { force: true });
