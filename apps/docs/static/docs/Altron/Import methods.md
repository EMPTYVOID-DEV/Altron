## Static Import

**Altron** requires a prop that consists of a map of components with the following structure:

- **Key: string**: This represents the component name , its the same as the component file name..
- **Value: componentType<SvelteComponent\>**: This signifies the class reference of the component.

The default method of import involves passing the exported `componentMap` from the index.js file generated by the CLI. While this is suitable for most scenarios, if your environment supports dynamic imports, there's an opportunity to leverage this feature.

## How to Dynamic Import

The following code example, found in the [recommendation](https://github.com/EMPTYVOID-DEV/Altron/blob/master/recommendations/utils/dynamicImport.ts) sub-directory of **@altron/altron**, demonstrates how to use dynamic import within SvelteKit's universal load function:

```typescript
import { dynamicRegistry } from '@altron/altron/consts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function Load() {
  const componentMap = new Map();
  const neededComponents = [
    ...dynamicRegistry.get('core'),
    ...dynamicRegistry.get('header'),
    ...dynamicRegistry.get('paragraph')
  ];
  
  for (const compPath of neededComponents) {
    const path = `$lib/components/altron/${compPath}.svelte`;
    const comp = (await import(path)).default;
    componentMap.set(compPath.split('/')[1], comp);
  }
  
  return componentMap;
}
```

The load function utilizes [dynamicRegistry](/docs/Usage/Consts/#dynamicRegistry) to obtain the paths of components required for a given block. These paths are relative to the **altron** components path, for example, `extra/dialog` or `core/toolBarUi`.

### Why is this Important

Imagine a scenario where a user opens one of their stored notes. In this case, you can use the **server load function** to retrieve the note content from your database, parse it, determine which blocks are in use, and then the **universal load function** gains access to the data returned from the **server load function**. In the **universal load function**, only load components that are dependencies of the detected used blocks.

### Notes

1. There are limitations on dynamic imports; for example, Vite does not accept absolute paths.
2. The **core** block includes this list of dependencies: [core](/docs/Altron/Components/#core) components, the **menu**, the **dialog**, and some icons.