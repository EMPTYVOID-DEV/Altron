# Introduction

**Altron** operates as a block-based editor, deviating from the conventional use of a global `contenteditable` element. Instead of manipulating a unified HTML structure, **Altron** structures its workspace using distinct blocks such as paragraphs, headings, images, lists, ,quotes...[etc](/docs/Usage/Types/#blocks). Each of these blocks functions as an independent `contenteditable` element or a more intricate structure.

### Clean Data

Every **Altron** instance establishes a [local Svelte store](https://joyofcode.xyz/svelte-context-with-stores), maintaining a list of [datablocks](/docs/Usage/Types/#datablock). These datablocks are simple objects with a standardized format:

- **id:** a unique string identifier with eight characters generated using [nanoid](https://www.npmjs.com/package/nanoid).
- **name:** representing the block's type.
- **data:** encapsulating the specific content of the block, varying across block types.

This approach surpasses the clarity and manageability of storing raw HTML, offering enhanced ease for storage, manipulation, and heightened security.

### Block State

For each datablock in the **datablocks** list, **Altron** renders the corresponding block component, which can exist in one of three states:

1. **View State:** Displaying information based on the block's type and associated data.
2. **Focus State:** Triggered by a click or touch, this state provides options for deleting the block or adjusting its position within the structure.
3. **Edit State:** A subsequent click or touch transitions the block into edit mode, enabling users to modify its information.

Each **Altron** instance possesses a separate local Svelte store that tracks the active block and its state (editing or focusing).

### UI Handling

Post version **2.0.0**, **@altron/altron** no longer manages the UI directly. Instead, it expects users to provide a map of component names and their corresponding class references.It will set the `componentMap` as context to be accessible accross the editor tree. **@altron/altron-cli** takes care of loading all dependencies, including Svelte components and potentially external packages, for the selected blocks. These components are fully customizable to meet user preferences.



