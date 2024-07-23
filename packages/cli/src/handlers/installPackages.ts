import { execa } from "execa";
import { getUserPkgManager } from "../utils/getPackageManager.js";
import { workingDir } from "../consts.js";
import { logger } from "../utils/logger.js";

export async function installPackages(packages: string[]) {
  if (packages.length == 0) {
    logger.info("no packages to be installed");
    return;
  }
  const pkgManager = getUserPkgManager();
  const pkgInstallMessage = pkgManager == "yarn" ? "add" : "install";
  try {
    const chilProcess = execa(pkgManager, [pkgInstallMessage, ...packages], {
      cwd: workingDir,
    });
    chilProcess.stdout?.pipe(process.stdout);
    await chilProcess;
    logger.success(
      `The packages "${packages.join(" , ")}" were installed successfully`
    );
  } catch (error: any) {
    if (pkgManager != "pnpm")
      logger.error(
        `The cli got this error while installing packages using ${pkgManager} : \n ${error.message} `
      );
  }
}
