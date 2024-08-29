import path from "path";
import fsExtra from "fs-extra";
import { logger } from "../utils/logger.js";
import type { PackageJson } from "type-fest";
import { workingDir } from "../consts.js";

export function altronCheck() {
  const pkgJsonPath = path.join(workingDir, "package.json");
  const pkgJson = fsExtra.readJSONSync(pkgJsonPath) as PackageJson;
  if (!pkgJson.dependencies || !pkgJson.dependencies["@altron/altron"]) {
    logger.error("You don't have altron installed, aborting...");
    process.exit(1);
  }
}
