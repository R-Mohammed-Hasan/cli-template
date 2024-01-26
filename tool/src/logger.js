import chalk from "chalk";
import debug from "debug";

export default function createLogger(name) {
  console.log("debug", process.env.DEBUG);
  return {
    log: (...args) => console.log(chalk.gray(...args)),
    warning: (...args) => console.log(chalk.yellow(...args)),
    highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
    debugger: process.env.DEBUG ? console.log : () => {},
  };
}
