import { logger } from "src/utils/logger.js";
import { registryJson } from "../types.js";

export function componentToPath(
  components: string[],
  registry: registryJson
): string[] {
  const paths: string[] = [];
  for (let component of components) {
    let currentPath = getPath(component, registry.registry);
    if (currentPath != "") {
      paths.push(currentPath);
    } else {
      logger.warn(
        `An error in the registry has been detected, we couldn't map the component ${component} to a path.`
      );
    }
  }
  logger.info("The path of components were extracted.");
  return paths;
}

function getPath(component: string, registry: string[]): string {
  for (let entry of registry) {
    if (entry.split("/")[1] == component) {
      return `${entry}.svelte`;
    }
  }
  return "";
}
