#!/usr/bin/env node

/* eslint-disable no-console */

import minimist from "minimist";
import { commands } from "./commands/index.js";

const command = process.argv[2];
const options = minimist(process.argv.slice(3));

try {
  if (!command && command === "undefiend") {
    process.exit(0);
  }

  if (command in commands) {
    commands[command](options);
  } else {
    throw new Error(`There is no such command: ${command}`);
  }
} catch (error) {
  console.error(error);
}
