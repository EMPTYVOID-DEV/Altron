# How It Works

Before delving into the workings of the CLI, it's important to note that the CLI uses unauthenticated API calls to the [GitHub Raw API](https://docs.github.com/en/rest/repos/contents) since authenticating API calls from external sources isn't feasible.

### 1. Retrieve Altron Version

The CLI looks for Altron in your working directory's `package.json`. If it's not installed or the version is lower than **3.1.2**, the process is aborted.

### 2. CLI Prompts

The CLI first prompts the user for the path to place Svelte components relative to the current working directory, with the default being **"src/components/altron"**. Afterward, it prompts the user to select the list of [blocks](/docs/Usage/Types/#blocks) they want to add.

### 3. Explore Block Dependencies

The CLI grabs details from the **blockDependencies.json** file. This file is like a cheat sheet, showing what components and packages are tied to the selected blocks.

### 4. Get Dependencies Locations

There's a **registry.json** file that contains the relative paths of components. The CLI tries to match up the component dependencies with their relative paths.

### 5. Write Components and Install Packages

The CLI writes all component dependencies in parallel, notifying the user about each component's state (loaded or failed to load). It also installs the required packages using the package manager that run it.

### 6. Create the index.js

Finally, the CLI imports all components and places their class references inside a map, where the key is the component's name, resulting in something like this:

```javascript
import CHECKLISTHANDLER from "./extra/checklistHandler.svelte";
export const componentMap = new Map([["checklistHandler", CHECKLISTHANDLER]]);
```

You will pass this `componentMap` to altron.

### Note

The cli will load a specific block called `core` which contains the [core](/docs/Altron/Components/#core) components , the **menu** and some icons.
