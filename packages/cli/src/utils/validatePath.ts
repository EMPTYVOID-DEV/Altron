export function validatePath(path: string) {
  const regex = /^[a-zA-Z_\-0-9]+(\/[a-zA-Z_\-0-9]+)*$/;
  return (
    regex.test(path) ||
    "Input a path without starting with /, and use only letters (a-zA-Z), underscores (_), and numbers (0-9)."
  );
}
