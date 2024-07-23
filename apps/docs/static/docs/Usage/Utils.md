# Utils

**Altron** **exports** some utility functions that come in handy when trying to extract, update, or get information about the component state. Here is a description of each one:

- **getAllBlocks**: This function returns all blocks in editor store.
- **getBlock**: This function returns the data for specific block.
- **setData**: This function allows you to update the data-blocks directly.
- **getEditorId:** This function returns the editor id.
- **getWorkingBlock**: This function allows you to get the working block id and its state. It can return null if none of the blocks are focused or edited (view state).

### Functions type

| Function        | Type                                                                  |
| --------------- | --------------------------------------------------------------------- |
| getAllBlocks    | ()=> dataBlock[]                                                      |
| getBlock        | (id:string)=> dataBlock                                               |
| setData         | (newData: dataBlock[] \| ((prev: dataBlock[]) => dataBlock[]))=> void |
| getWorkingBlock | ()=>{state: "focused" \| "editing"; id: string; }                     |
| getEditorId     | ()=>string                                                            |

### Way to call

These functions are exported from the **Altron** component, which means in order to use them, you have to bind a variable to the component reference.

```Typescript
<script lang="ts">
import Altron from '@altron/altron/altron.svelte';
import { onMount } from 'svelte';
let editor: Altron = null;

onMount(() => {
    const intervalId = setInterval(() => {
        const data = editor.getAllBlocks()
        const workingBlock = editor.getWorkingBlock()
        console.log(data, workingBlock)
    }, 2000)
});

</script>

<div>
     <Altron bind:this={editor} />
</div>
```
