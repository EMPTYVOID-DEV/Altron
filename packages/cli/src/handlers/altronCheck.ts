import path from "path";
import fsExtra from "fs-extra";
import { logger } from "../utils/logger.js";
import type { PackageJson } from "type-fest";
import { workingDir } from "../consts.js";
import { compareVersions } from "src/utils/compareVersion.js";

export function altronCheck() {
  const pkgJsonPath = path.join(workingDir, "package.json");
  const pkgJson = fsExtra.readJSONSync(pkgJsonPath) as PackageJson;
  if (!pkgJson.dependencies || !pkgJson.dependencies["@altron/altron"]) {
    logger.error("You don't have altron installed, aborting...");
    process.exit(1);
  }
  const altronVersion = pkgJson.dependencies["@altron/altron"];
  if (compareVersions(altronVersion, "2.0.0") == -1) {
    logger.error(
      "It seems you re using a version of altron less than 2.0.0 which means you don't need the cli"
    );
    process.exit(1);
  }
  logger.info(`Version ${altronVersion} was detected.`);
  return altronVersion;
}
