import inquirer from "inquirer";
import { validatePath } from "../utils/validatePath.js";
import { blocksList } from "../consts.js";
import { blocks } from "../types.js";
export async function cli(): Promise<{
  altronPath: string;
  choices: blocks[];
}> {
  // prompt for components path
  const { altronPath } = await inquirer.prompt({
    name: "altronPath",
    type: "input",
    validate: validatePath,
    default: "src/lib/components/altron",
    message: "Enter the path of altron components",
  });
  // prompt for blocks that need loaded
  const { choices } = await inquirer.prompt<{ choices: blocks[] }>({
    name: "choices",
    type: "checkbox",
    choices: blocksList.map((el) => ({ checked: false, name: el })),
    message: "Choose the blocks to load",
  });

  return { altronPath, choices };
}
