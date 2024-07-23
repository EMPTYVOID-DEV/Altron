import { parentDirs, workingDir } from "../consts.js";
import Path from "path";
import fsExtra from "fs-extra";
import { logger } from "src/utils/logger.js";

export function createIndex(altronPath: string) {
  let importContent = "";
  let componentMap = "";
  const existingComponents = getExistingComponents(altronPath);
  const indexPath = Path.join(workingDir, altronPath, "index.js");
  fsExtra.createFileSync(indexPath);
  for (let componentPath of existingComponents) {
    importContent += `${addNewImport(componentPath)}\n`;
    componentMap += `${addComponentMap(componentPath)},\n`;
  }
  let indexContent = `${importContent}\nexport const componentMap=new Map([\n${componentMap}])`;
  fsExtra.writeFileSync(indexPath, indexContent);
  logger.info("The import index has been created.");
}

function getExistingComponents(altronPath: string): string[] {
  const altronAbsolutePath = Path.join(workingDir, altronPath);
  const existingComponents: string[] = [];
  for (const parentDir of parentDirs) {
    let currentDirPath = Path.join(altronAbsolutePath, parentDir);
    fsExtra
      .readdirSync(currentDirPath)
      .forEach((component) =>
        existingComponents.push(`${parentDir}/${component}`)
      );
  }
  return existingComponents;
}

function addNewImport(componentPath: string) {
  // parent dir is like extra-core
  const [parentDir, fileName] = componentPath.split("/");
  const [componentName, extension] = fileName.split(".");
  return `import ${componentName.toUpperCase()} from "./${parentDir}/${fileName}"`;
}

function addComponentMap(componentPath: string) {
  const [parentDir, fileName] = componentPath.split("/");
  const [componentName, extension] = fileName.split(".");
  return ` ["${componentName}",${componentName.toUpperCase()}]`;
}
