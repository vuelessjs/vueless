#!/usr/bin/env node

import { writeFile, rm, mkdir } from "node:fs/promises";
import path from "node:path";
import { cwd } from "node:process";

import { buildTSFile } from "../src/utils/node/helper.js";

import { VUELESS_CACHE_DIR } from "../src/constants.js";

const localeJsPath = path.join(VUELESS_CACHE_DIR, "locales", "en.js");
const localeTsPath = "src/adatper.locale/locales/en.ts";
const jsonLocalePath = "dist/locales";
const importLocalePath = path.join(cwd(), localeJsPath);
const distLocalePath = path.join(jsonLocalePath, "en.json");

await buildTSFile(localeTsPath, localeJsPath);

const defaultEnLocale = (await import(importLocalePath)).default;

await mkdir(jsonLocalePath, { recursive: true });
await writeFile(distLocalePath, JSON.stringify(defaultEnLocale), "utf-8");

await rm(localeJsPath, { force: true });
