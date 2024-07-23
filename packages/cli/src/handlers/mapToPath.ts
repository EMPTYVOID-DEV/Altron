import { logger } from "src/utils/logger.js";
import { registryJson } from "../types.js";
import { compareVersions } from "../utils/compareVersion.js";

export function componentToPath(
  components: string[],
  registry: registryJson,
  version: string
): string[] {
  // list of registry entries after 2.0.0 but still less than the version that user has
  // sorted based on version in descending order
  const validRegistry = registry.registry
    .filter((ver) => {
      return compareVersions(ver.version, version) <= 0;
    })
    .sort((a, b) => {
      return compareVersions(a.version, b.version) * -1;
    });
  // for each component we search the registry for a path that is under the latest version
  const paths: string[] = [];
  for (let component of components) {
    let currentPath = getPath(component, validRegistry);
    // in case the path does not exist we log an error to the user and we continue
    if (currentPath != "") {
      paths.push(currentPath);
    }
  }
  logger.info("The path of components were extracted.");
  return paths;
}

function getPath(
  component: string,
  registry: {
    version: string;
    changes: string[];
  }[]
): string {
  for (let entry of registry) {
    for (let current of entry.changes) {
      if (current.split("/")[1] == component) {
        return `${entry.version}/${current}.svelte`;
      }
    }
  }
  logger.error(
    `An error in the registry has been detected, we couldn't map the component ${component} to a path.`
  );
  return "";
}
