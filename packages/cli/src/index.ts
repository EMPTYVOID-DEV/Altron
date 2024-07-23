#!/usr/bin/env node

import { welcome } from "./utils/welcome.js";
import { getMetaData } from "./handlers/getMetaData.js";
import { cli } from "./handlers/cli.js";
import { createAltronDir } from "./handlers/createAltronDir.js";
import { getDependencies } from "./handlers/getDependencies.js";
import { altronCheck } from "./handlers/altronCheck.js";
import { componentToPath } from "./handlers/mapToPath.js";
import { loadComponents } from "./handlers/loadComponents.js";
import { installPackages } from "./handlers/installPackages.js";
import { createIndex } from "./handlers/createIndex.js";
import { logger } from "./utils/logger.js";
import { whatNext } from "./handlers/whatNext.js";

async function main() {
  welcome();
  const usedVersion = altronCheck();
  const { altronPath, choices } = await cli();
  const { registry, blockDependencies } = await getMetaData();
  await createAltronDir(altronPath);
  const { components, packages } = getDependencies(choices, blockDependencies);
  const componentPaths = componentToPath(components, registry, usedVersion);
  await loadComponents(componentPaths, altronPath);
  await installPackages(packages);
  createIndex(altronPath);
  whatNext();
}
main().catch((err) => {
  err.message = err.message ?? "no specific message";
  logger.error(
    `It seems unknown error has occured with this message ${err.message} .Please report it to us.`
  );
});
