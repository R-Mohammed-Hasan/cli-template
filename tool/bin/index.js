#!/usr/bin/env node --no-warnings
import arg from "arg";
import chalk from "chalk";
import { getConfig } from "../src/config/config-mgr.js";
import { start } from "../src/commands/start.js";
import createLogger from "../src/logger.js";

const logger = createLogger("bin:index");
try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });
  logger.debugger("Received args", args);

  if (args["--start"]) {
    const config = getConfig();
    start(config);
  }
} catch (e) {
  logger.warning(e.message);
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app`);
}
