import { customGithubFetch } from "../utils/customFetch.js";
import { workingDir } from "../consts.js";
import fsExtra from "fs-extra";
import path from "path";
import { logger } from "../utils/logger.js";

export async function loadComponents(
  baseUrl: string,
  componentsPaths: string[],
  writeLocation: string
) {
  const registryPath = "src/registry";
  const fetchPromises = componentsPaths.map(async (component) => {
    return customGithubFetch(`${baseUrl}/${registryPath}/${component}`)
      .then((content) => {
        return writeFile(component, content, writeLocation);
      })
      .then(() => {
        logger.success(`The component ${component} was loaded.`);
      })
      .catch(() => {
        logger.error(`The component ${component} was not loaded`);
      });
  });
  return Promise.allSettled(fetchPromises);
}

function writeFile(component: string, content: string, writeLocation: string) {
  const absolutePath = path.join(workingDir, writeLocation, component);
  fsExtra.createFileSync(absolutePath);
  return fsExtra.writeFile(absolutePath, content);
}
