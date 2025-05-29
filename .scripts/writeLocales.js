#!/usr/bin/env node

import { writeFile, rm, mkdir } from "node:fs/promises";

import { buildTSFile } from "../src/utils/node/helper.js";
import path from "node:path";

const BUILDED_LOCALES_PATH = "src/adatper.locale/locales/en.js";
const BUILDED_LOCALES_TS_PATH = "src/adatper.locale/locales/en.ts";
const JSON_LOCALES_DIR = "dist/locales";

await buildTSFile(BUILDED_LOCALES_TS_PATH, BUILDED_LOCALES_PATH);

const defaultEnLocale = (await import(path.join(process.cwd(), BUILDED_LOCALES_PATH))).default;

await mkdir(JSON_LOCALES_DIR, { recursive: true });
await writeFile(path.join(JSON_LOCALES_DIR, "en.json"), JSON.stringify(defaultEnLocale), "utf-8");

await rm(BUILDED_LOCALES_PATH, { force: true });
