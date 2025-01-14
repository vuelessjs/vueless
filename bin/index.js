#!/usr/bin/env node

/* eslint-disable no-console */

import { commands } from "./commands/index.js";

import { DEFAULT_EXIT_CODE, FAILURE_CODE } from "./constants.js";

const [command, ...options] = process.argv.slice(2);

try {
  if (!command || command === "undefiend") {
    process.exit(DEFAULT_EXIT_CODE);
  }

  if (command in commands) {
    commands[command](options);
  } else {
    throw new Error(`There is no such command: ${command}`);
  }
} catch (error) {
  console.error(error.message);
  process.exit(error.code || FAILURE_CODE);
}
