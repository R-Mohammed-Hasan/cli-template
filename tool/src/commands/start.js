import createLogger from "../logger.js";

const logger = createLogger("commands:start");
export function start(config) {
  logger.highlight("  Starting the app  ");
  logger.debugger("Received configuration", config);
}
