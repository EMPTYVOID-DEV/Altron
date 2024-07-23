import { rawPath } from "../consts.js";

export function constructBaseUrl(usedVersion: string) {
  return `${rawPath}/@altron/altron@${usedVersion}/packages/main`;
}
