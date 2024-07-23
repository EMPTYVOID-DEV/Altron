import { blocksList } from "./consts.js";

export type blocks = (typeof blocksList)[number];

export type registryJson = {
  description: string;
  registry: string[];
};

export type blockDependenciesJson = {
  description: string;
  components: { block: blocks | "core"; dependencies: string[] }[];
  packages: { block: blocks; dependencies: string[] }[];
};
