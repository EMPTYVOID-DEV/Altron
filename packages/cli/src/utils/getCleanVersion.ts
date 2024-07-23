import { validVersion } from "src/consts.js";

export function getCleanVersion(versionString: string) {
  const versionRegex = /\d+\.\d+\.\d+/;
  const match = versionString.match(versionRegex);
  return match ? match[0] : validVersion;
}
