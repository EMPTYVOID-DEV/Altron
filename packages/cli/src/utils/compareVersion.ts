import semver from "semver";

export function compareVersions(a: string, b: string) {
  const parsedA = semver.coerce(a)!;
  const parsedB = semver.coerce(b)!;
  return semver.compare(parsedA, parsedB);
}
