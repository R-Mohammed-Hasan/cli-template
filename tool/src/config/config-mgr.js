import schema from "./schema.json" assert { type: "json" };
import Ajv from "ajv";
import betterAjvErrors from "better-ajv-errors";
import { cosmiconfigSync } from "cosmiconfig";
import log from "../logger.js";

const logger = log("config:mgr");
const ajv = new Ajv({});

const configLoader = cosmiconfigSync("tool");

export function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    logger.warning("Could not find configuration, using default");
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning("Invalid configuration was supplied");
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    logger.debugger("Found configuration", result.config);
    return result.config;
  }
}
