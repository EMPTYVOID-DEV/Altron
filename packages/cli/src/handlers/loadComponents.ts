import { customGithubFetch } from "../utils/customFetch.js";
import { workingDir } from "../consts.js";
import fsExtra from "fs-extra";
import path from "path";
import { logger } from "../utils/logger.js";

export async function loadComponents(
  components: string[],
  writeLocation: string
) {
  const registryPath = "src/registry";
  // creating paralle request to github api to load the components content
  // all components are under src/registry we only need the version and the component name 'component'
  const fetchPromises = components.map(async (component) => {
    return customGithubFetch(`${registryPath}/${component}`)
      .then((content) => {
        // removing the version from the component
        const componentWithoutVer = component.split("/");
        componentWithoutVer.shift();
        return writeFile(componentWithoutVer.join("/"), content, writeLocation);
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
