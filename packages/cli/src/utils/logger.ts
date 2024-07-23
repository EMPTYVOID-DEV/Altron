import chalk from "chalk";
import { errorColor, warnColor, successColor, infoColor } from "../consts.js";

export const logger = {
  warnChalk: chalk.hex(warnColor),
  errorChalk: chalk.hex(errorColor),
  successChalk: chalk.hex(successColor),
  infoChalk: chalk.hex(infoColor),
  warn(...args: unknown[]) {
    console.log(this.warnChalk("\n", ...args));
  },
  error(...args: unknown[]) {
    console.log(this.errorChalk("\n", ...args));
  },
  success(...args: unknown[]) {
    console.log(this.successChalk("\n", ...args));
  },
  info(...args: unknown[]) {
    console.log(this.infoChalk("\n", ...args));
  },
};
