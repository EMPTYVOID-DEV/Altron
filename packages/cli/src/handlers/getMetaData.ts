import { blockDependenciesJson, registryJson } from "src/types.js";
import { customGithubFetch } from "../utils/customFetch.js";
import { logger } from "src/utils/logger.js";

export async function getMetaData(baseUrl: string): Promise<{
  registry: registryJson;
  blockDependencies: blockDependenciesJson;
}> {
  const responses = await Promise.allSettled([
    customGithubFetch(`${baseUrl}/registry.json`),
    customGithubFetch(`${baseUrl}/blockDependencies.json`),
  ]);
  // @ts-ignore
  const registry = JSON.parse(responses[0].value);
  // @ts-ignore
  const blockDependencies = JSON.parse(responses[1].value);
  logger.info("The registry and block dependencies were loaded.");
  return { registry, blockDependencies };
}
