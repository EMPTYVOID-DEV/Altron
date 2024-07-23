import { workingDir } from "../consts.js";
import fsExtra from "fs-extra";
import path from "path";
import { logger } from "src/utils/logger.js";

export function createAltronDir(altronPath: string) {
  const absolutePath = path.join(workingDir, altronPath);
  return fsExtra
    .mkdir(absolutePath, {
      recursive: true,
    })
    .then(() => {
      logger.info(
        `Altron dircectory was created under the relative path ${altronPath}`
      );
    });
}
