import { logger } from "src/utils/logger.js";
import { blockDependenciesJson, blocks } from "../types.js";

export function getDependencies(
  choices: blocks[],
  blockDependencies: blockDependenciesJson
): {
  components: string[];
  packages: string[];
} {
  const components = new Set<string>();
  const packages = new Set<string>();
  // adding the core components
  const core = blockDependencies.components.find((el) => el.block == "core")!;
  addToSet(components, core?.dependencies);
  // loop over the choices and add the dependencies to sets
  for (let i = 0; i < choices.length; i++) {
    let choiceComponents = blockDependencies.components.find(
      (el) => el.block == choices[i]
    )?.dependencies as string[];
    let choicePackages = blockDependencies.packages.find(
      (el) => el.block == choices[i]
    )?.dependencies;
    // adding the current component dependencies
    addToSet(components, choiceComponents);
    // some chosen packages may not have package dependencies
    if (choicePackages) {
      addToSet(packages, choicePackages);
    }
  }
  logger.info("The needed dependencies had been identified");
  return {
    components: setToList(components),
    packages: setToList(packages),
  };
}

function addToSet<T>(set: Set<T>, list: T[]) {
  for (let i = 0; i < list.length; i++) {
    set.add(list[i]);
  }
}

function setToList<T>(set: Set<T>) {
  const list: T[] = [];
  for (let el of set) {
    list.push(el);
  }
  return list;
}
