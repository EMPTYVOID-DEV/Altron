
# Altron Rich Text V2.0.0

![Altron Logo](./static/altronGreen.jpg)

## Introduction

**Altron Rich Text** is a robust and versatile rich text editor designed for Svelte applications. It empowers users to effortlessly create, edit, and manage structured text content by seamlessly incorporating various blocks with associated data. This component is meticulously crafted to offer high customizability, responsiveness on mobile devices, and support for both editing and viewing modes.

## Installation

To kickstart your journey with **Altron Rich Text**, install it via your preferred package manager:

```bash
npm install altron-rich-text
# or
yarn add altron-rich-text
# or 
pnpm i altron-rich-text
```

## Basic Usage

Integrating the Altron Rich Text editor into your Svelte application is as simple as importing the `AltronRichText` component and incorporating it into your project.

```ts
<script>
  import { AltronRichText } from 'altron-rich-text';
</script>

<AltronRichText />
```

## Data Structure

The rich text editor operates on a distinct data structure known as `dataBlock`. This type encompasses:

- `image`: Represents image blocks with data such as base64 representation, name, and caption.
- `paragraph`: Fundamental text blocks.
- `code`: Code blocks with text content and a specified programming language.
- `quote`: Text quotes with owner attribution.
- `header`: Header blocks with different levels (1 to 4) and associated text.
- `space`: Empty space blocks with a specified size.
- `list`: List blocks with items and an ordered or unordered list type.

```ts
type dataBlock =
| { name: 'image'; id: string; data: { base64: string; name: string; caption: string } }
| { name: 'paragraph'; id: string; data: { text: string } }
| { name: 'code'; id: string; data: { text: string; lang: languages } }
| { name: 'quote'; id: string; data: { text: string; owner: string } }
| { name: 'header'; id: string; data: { text: string; level: 1 | 2 | 3 | 4 } }
| { name: 'space'; id: string; data: { size: number } }
| { name: 'list'; id: string; data: { items: string[]; type: 'ordered' | 'unordered' } };
```

### Block States

Every block in the **Altron Rich Text** editor can exist in one of three states:

1. **View State:** In this state, the block displays its information based on its type and associated data.
2. **Focus State:** Upon clicking a block, it transitions to the focus state. Here, the block is enveloped with options for deleting the block, moving it up and down (default options of the `menu`).
3. **Edit State:** Upon another click, the block enters the edit state, allowing users to modify the block's information.

## Customization

Various aspects of the rich text editor can be customized:

- **Colors:**
  - `primaryColor`: Used in both focus and view states.
  - `secondaryColor`: Specifically used in the edit state.
  - `textColor`: Defines the text color within the editor.
  - `bgColor`: The background color of your app, needed with `menu`.

- **Fonts:**
  - `headerFont`: Sets the font for header elements (e.g., h1, h2, h3, h4).
  - `bodyFont`: Defines the font for general text elements (e.g., p, span, label, li, a).

- **Font Sizes and Line Heights:**
  - Customize font sizes using `h1`, `h2`, `h3`, `h4`, `body`, `small`.
  - Set line heights for various text elements using `lh1`, `lh2`, `lh3`, `lh4`, and `lbody`.

- **Custom Code Block Languages:** Define the list of languages users can use for code blocks with the `codeBlockLanguages` prop. By default, it includes JavaScript, Java, C, CSS, TypeScript, Python, and C#.

- **Excluded Blocks**: This prop excludes a list of blocks from the blocks menu. This only restricts the end user from adding these blocks; you can still add those using the `setData` function.

- **Custom spacing:** By default, **Altron** separates blocks with a 10px gap and has **margin-block** set to 30px. You can change that using **blocksGap** and **marginBlock** props.

- **Custom Components:** You can replace the default view components for various block types with your custom components.
    - `customImage` for image blocks
    - `customCode` for code blocks
    - `customList` for list blocks
    - `customHeader` for header blocks
    - `customParagraph` for paragraph blocks
    - `customQuote` for quote blocks
    - `customMenu` The default menu allows for deleting, moving up and down the **focused** block.

```ts
export let customImage: ComponentType<
SvelteComponent<{ base64: string; name: string; caption: string }>
> = ViewImage;

export let customCode: ComponentType<SvelteComponent<{ text: string; lang: languages }>> =
ViewCode;

export let customList: ComponentType<
SvelteComponent<{ items: string[]; type: 'ordered' | 'unordered' }>
> = ViewList;

export let customHeader: ComponentType<SvelteComponent<{ text: string; level: 1 | 2 | 3 | 4 }>> =
ViewHeader;

export let customParagraph: ComponentType<SvelteComponent<{ text: string }

>> = ViewParagraph;

export let customQuote: ComponentType<SvelteComponent<{ text: string; owner: string }>> =
ViewQuote;
export let customMenu: ComponentType<SvelteComponent<{ close: () => void }>> = null;
```

## View Mode

The Altron Rich Text editor includes a `viewMode` prop, which, when set to `true`, allows you to use the editor in read-only mode. In this mode, you can display existing content without enabling editing.

```ts
<script>
  import { AltronRichText } from 'altron-rich-text';
</script>

<AltronRichText viewMode={true} />
```

## Utils

**Altron** **exports** some utility functions that come in handy when trying to extract, update, or get information about the component state. Here is a description of each one:

- `getData`: This function returns the data-blocks that are stored at a given moment.
- `setData`: This function allows you to update the data-blocks directly.
- `getWorkingBlock`: This function allows you to get the working block id and its state. It can return null if none of the blocks are focused or edited (view state).

```ts
type getData:()=> dataBlock[]
type setData:(newData: dataBlock[] | ((prev: dataBlock[]) => dataBlock[]))=> void
type getWorkingBlock:()=>{state: "focused" | "editing";  id: string; } | null
```

### Usage

These functions are exported from the **AltronRichText** component, which means in order to use them, you have to bind a variable to the component reference (this).

```ts
<script lang="ts">
import AltronRichText from 'Altron-rich-text';
import { onMount } from 'svelte';
let editor: AltronRichText = null; // we are creating a variable to hold a  
     //reference to the AltronRichText component 
 
onMount(() => {
    editor.setData([{ id: '12', name: 'header', data: { text: 'hello friend!', 
          level: 1 } }]); // initialize the editor with a header
    const intervalId=setInterval(()=>{
        const data =editor.getData()
        const workingBlock=editor.getWorkingBlock()
        console.log(data,workingBlock)        
    },2000)
    // here we have created a setInterval that prints the component data and  
     //working block each two seconds
     return ()=>{
        clearInterval(intervalId)
     }
});
</script>  
   <div>
     <AltronRichText bind:this={editor} viewMode={true} />
   </div>
```

## Notes

#### Code Highlighting

**Altron** by default doesn't highlight code blocks mainly to decrease the package size, but we recommend using [svelte-highlight](https://www.npmjs.com/package/svelte-highlight). There is a `customCode` example that uses **svelte-highlight** in the suggestions sub-directory of the project repository.

#### More than one instance

Starting from version **v2.0.0**, the data of **AltronRichText** component is isolated, allowing us to create more than one instance of the component for things like changes comparison.

#### Component Reference Typing

In case you want to get linting and auto-completion when using the utility functions, you have to type the component reference.

## Props

Here are all **Altron Rich Text** props and their default values:

| Name                  | Type                                      | Default Value                                                             |
|-----------------------|-------------------------------------------|---------------------------------------------------------------------------|
| excludedBlocks        | blocks[]                                  | []                                                                        |
| viewMode              | boolean                                   | false                                                                     |
| headerFont            | string                                    | 'Verdana, sans-serif'                                                     |
| bodyFont              | string                                    | 'Helvetica, sans-serif'                                                   |
| primaryColor          | string                                    | '#3366FF'                                                                 |
| secondaryColor        | string                                    | '#1eeb36'                                                                 |
| textColor             | string                                    | '#121212'                                                                 |
| bgColor               | string                                    | '#ffffff'                                                                 |
| blocksGap             | number                                    | 10                                                                        |
| marginBlock           | number                                    | 30                                                                        |
| h1                    | string                                    | 'clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)'         |
| h2                    | string                                    | 'clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem)'         |
| h3                    | string                                    | 'clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem)'         |
| h4                    | string                                    | 'clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)'     |
| body                  | string                                    | 'clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem)'          |
| small                 | string                                    | 'clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) * 0.1736)), 1rem)'      |
| lh1                   | string                                    | '1.3'                                                                     |
| lh2                   | string                                    | '1.35'                                                                    |
| lh3                   | string                                    | '1.4'                                                                     |
| lh4                   | string                                    | '1.5'                                                                     |
| lbody                 | string                                    | '1.6'                                                                     |
| codeBlockLanguages    | languages[]                               | ['javascript', 'java', 'c', 'css', 'plaintext', 'typescript', 'python', 'csharp'] |
| customImage           | ComponentType<SvelteComponent<{ base64: string; name: string; caption: string }>> | ViewImage |
| customCode            | ComponentType<SvelteComponent<{ text: string; lang: languages }>> | ViewCode |
| customList            | ComponentType<SvelteComponent<{ items: string[]; type: 'ordered' | 'unordered' }>> | ViewList |
| customHeader          | ComponentType<SvelteComponent<{ text: string; level: 1 | 2 | 3 | 4 }>> | ViewHeader |
| customParagraph       | ComponentType<SvelteComponent<{ text: string }>> | ViewParagraph |
| customQuote           | ComponentType<SvelteComponent<{ text: string; owner: string }>> | ViewQuote |
| customMenu            | ComponentType<SvelteComponent<{ close: () => void }>> | null        |


## Contribution

We welcome contributions! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Feel free to use or modify as needed!