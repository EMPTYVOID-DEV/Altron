# Altron

![Altron Logo](./static/altronBg.png)

## Documentation site

You can check our [altron-site](https://altron.vercel.app). We have much clear documentation with example and live testing route.

## Introduction

**Altron** is a robust and versatile rich text editor designed for Svelte applications. It empowers users to effortlessly create, edit, and manage structured text content by seamlessly incorporating various blocks with associated data. This component is meticulously crafted to offer high customizability, responsiveness on mobile devices, and support for both editing and viewing modes.

## Installation

To kickstart your journey with **Altron**, install it via your preferred package manager:

```bash
npm install @altron/altron
# or
yarn add @altron/altron
# or
pnpm i @altron/altron
```

## Basic Usage

Integrating the Altron editor into your Svelte application is as simple as importing the **Altron** component and incorporating it into your project.

```ts
<script>
  import  {Altron}  from '@altron/altron';
</script>

<Altron />
```

## Data Structure

**Altron** operates on blocks. Here are the supported blocks:

- `image`
- `paragraph`
- `code`
- `quote`
- `header`
- `space`
- `list`
- `checklist`
- `attachment`
- `embed`

### Block States

Every block in the **Altron** editor can exist in one of three states:

1. **View State:** In this state, the block displays its information based on its type and associated data.
2. **Focus State:** Upon clicking/touching a block, it transitions to the focus state. Here, the block is enveloped with options for deleting the block, moving it up and down (default options of the `menu`).
3. **Edit State:** Upon another click/touch, the block enters the edit state, allowing users to modify the block's information.

## Customization

Various aspects of the rich text editor can be customized through props. For more information about each prop, check the props section.

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

- **Custom spacing:** By default, **Altron** separates blocks with a 10px gap and have the different margins set to 10px. you can change that through these props: **marginLeft** ,**marginRight** ,**marginTop** ,**marginBottom** and **blocksGap**.

- **Custom width** : You can also pass custom width for the editor the default is **95%**.

- **Custom Code Block Languages:** Define the list of languages users can use for code blocks with the `codeBlockLanguages` prop. By default, it includes JavaScript, Java, C, CSS, TypeScript, Python, and C#.

- **Excluded Blocks**: This prop excludes a list of blocks from the blocks menu. This only restricts the end user from adding these blocks; you can still add those using the `setData` function.

- **AttachmentTypes**: This prop specifies the mime types supported by attachment block default to "\*" meaning accept any file format/extension. For more information, check the [accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept).

- **AcceptedEmbedSrcs**: This prop defines an array of regexs for `embed` block accepted sources. This defaults to an empty array to accept any source.

- **iframeSettings**: This contains iframe attributes that will be used to show the `embed` block data.

#### ProcessEmbedSrcs

This function is going to be used in the embed block view state and takes as an argument accepted source to modify it before passing it to the iframe. For example, here we are turning the badly formed YouTube source to an accepted one.

```ts
processEmbedSrcs={(src) => {
   const a = src.split('/');
   a.splice(a.length - 1, 0, 'embed');
   return a.join('/').replace('watch?v=', '');
}}
```

#### **Custom Components**

You can replace the default view components for various block types with your custom components.

- `customImage`
- `customCode`
- `customList`
- `customHeader`
- `customParagraph`
- `customQuote`
- `customEmbed`
- `customCheckList`
- `customAttachment`
- `customMenu` The default menu allows for deleting, moving up and down the **focused** block.

## View Mode

The **Altron** editor includes a `viewMode` prop, which, when set to `true`, allows you to use the editor in read-only mode. In this mode, you can display existing content without enabling editing.

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

These functions are exported from the **AltronRichText**

component, which means in order to use them, you have to bind a variable to the component reference.

```ts
<script lang="ts">
import {Altron} from '@altron/altron';
import { onMount } from 'svelte';
let editor: Altron = null; // we are creating a variable to hold a reference to the AltronRichText component

onMount(() => {
    editor.setData([{ id: '12', name: 'header', data: { text: 'hello friend!', level: 1 } }]); // initialize the editor with a header
    const intervalId = setInterval(() => {
        const data = editor.getData()
        const workingBlock = editor.getWorkingBlock()
        console.log(data, workingBlock)
    }, 2000)
    // here we have created a setInterval that prints the component data and working block each two seconds
    return () => {
        clearInterval(intervalId)
    }
});
</script>
   <div>
     <Altron bind:this={editor} viewMode={true} />
   </div>
```

## Events

**Altron** component fires several events when used in edit-mode (viewMode set to false). Let's go through them:

| Event Name   | Description                           | Detail Information                                                           |
| ------------ | ------------------------------------- | ---------------------------------------------------------------------------- |
| blockAdded   | Fired when a new block has been added | Block ID and name                                                            |
| blockDeleted | Fired when a block has been deleted   | Block ID, name, and data                                                     |
| blockMoved   | Fired when a block is moved           | Block ID and `up` attribute (boolean) indicating whether it moved up or down |
| focusing     | Fired when a block gains focus        | Block ID                                                                     |
| editing      | Fired when a block is being edited    | Block ID                                                                     |
| update       | Fired on every update to a block data | Block ID , previous data and the new data                                    |
| afterEditing | Fired after quitting editing state    | Block ID                                                                     |

## Types

**Altron** uses well-defined types across all of its sub-components. Here they are:

```ts
type IframeSettings = {
	allow?: string;
	sandbox?: string;
	referrerpolicy?:
		| 'no-referrer'
		| 'no-referrer-when-downgrade'
		| 'origin'
		| 'origin-when-cross-origin'
		| 'same-origin'
		| 'strict-origin'
		| 'strict-  origin-when-cross-origin'
		| 'unsafe-url';
	credentialless?: boolean;
	loading?: 'eager' | 'lazy';
};

type blocks =
	| 'image'
	| 'code'
	| 'quote'
	| 'paragraph'
	| 'header'
	| 'list'
	| 'space'
	| 'checklist'
	| 'attachment'
	| 'embed';

type dataBlock =
	| { name: 'image'; id: string; data: { file: File; caption: string } }
	| { name: 'paragraph'; id: string; data: { text: string } }
	| { name: 'code'; id: string; data: { text: string; lang: string } }
	| { name: 'quote'; id: string; data: { text: string; owner: string } }
	| { name: 'header'; id: string; data: { text: string; level: 1 | 2 | 3 | 4 } }
	| { name: 'space'; id: string; data: { size: number } }
	| { name: 'list'; id: string; data: { items: string[]; type: 'ordered' | 'unordered' } }
	| { name: 'checklist'; id: string; data: { items: { value: string; checked: boolean }[] } }
	| { name: 'attachment'; id: string; data: { file: File; title: string } }
	| { name: 'embed'; id: string; data: { src: string } };
```

## Notes

#### Code Highlighting

**Altron** by default doesn't highlight code blocks mainly to decrease the package size, but we recommend using [svelte-highlight](https://www.npmjs.com/package/svelte-highlight). There is a `customCode` example that uses **svelte-highlight** in the suggestions sub-directory of the project repository.

#### More than one instance

The data of **Altron** component is isolated, allowing us to create more than one instance of the component for things like changes comparison.

#### Error handling

When unwanted data has been added by the user **Altron** sets the default value.

- `embed` when the input value is not a https-url or didn't follow the `acceptedEmbedSrcs` altron will set the source to empty string then handle it inside the view component.
- `attachment` if the user didnt select a file or the selection does not meet the `attachmentTypes` altron will set the file to null.
- same with `image` block file is null until a proper image get selected.

## Props

Here are all **Altron** props and their default values:

| Name               | Type                    | Default Value                                                                     |
| ------------------ | ----------------------- | --------------------------------------------------------------------------------- |
| processEmbedSrcs   | (src: string) => string | (src: string) => {return src;};                                                   |
| excludedBlocks     | blocks[]                | []                                                                                |
| attachmentTypes    | string                  | "\*"                                                                              |
| acceptedEmbedSrcs  | string[]                | []                                                                                |
| iframeSettings     | IframeSettings          | {}                                                                                |
| viewMode           | boolean                 | false                                                                             |
| headerFont         | string                  | 'Verdana, sans-serif'                                                             |
| bodyFont           | string                  | 'Helvetica, sans-serif'                                                           |
| primaryColor       | string                  | '#3366FF'                                                                         |
| secondaryColor     | string                  | '#1eeb36'                                                                         |
| textColor          | string                  | '#121212'                                                                         |
| bgColor            | string                  | '#ffffff'                                                                         |
| blocksGap          | string                  | "10px"                                                                            |
| marginLeft         | string                  | "10px"                                                                            |
| marginRight        | string                  | "10px"                                                                            |
| marginTop          | string                  | "10px"                                                                            |
| marginBottom       | string                  | "10px"                                                                            |
| width              | string                  | "95%"                                                                             |
| h1                 | string                  | 'clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) \* 0.9722)), 2.1rem)'               |
| h2                 | string                  | 'clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) \* 0.9722)), 1.8rem)'               |
| h3                 | string                  | 'clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) \* 0.9722)), 1.5rem)'               |
| h4                 | string                  | 'clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) \* 0.3472)), 1.2rem)'            |
| body               | string                  | 'clamp(1rem, calc(1rem + ((1vw - 0.48rem) \* 0.1736)), 1.125rem)'                 |
| small              | string                  | 'clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) \* 0.1736)), 1rem)'             |
| lh1                | string                  | '1.3'                                                                             |
| lh2                | string                  | '1.35'                                                                            |
| lh3                | string                  | '1.4'                                                                             |
| lh4                | string                  | '1.5'                                                                             |
| lbody              | string                  | '1.6'                                                                             |
| codeBlockLanguages | string[]                | ['javascript', 'java', 'c', 'css', 'plaintext', 'typescript', 'python', 'csharp'] |

#### Custom components

| Component        | Props                                                                            |
| ---------------- | -------------------------------------------------------------------------------- |
| customEmbed      | Accepts a `src` prop of type `string` for the embedded view.                     |
| customAttachment | Accepts a `file` prop of type `File` and a `title` prop of type `string`.        |
| customImage      | Accepts `file` (File) , and `caption` (string) props.                            |
| customCode       | Accepts `text` (string) and `lang` (string) props.                               |
| customList       | Accepts `items` (array of strings) and `type` ('ordered' or 'unordered') props.  |
| customHeader     | Accepts `text` (string) and `level` (1, 2, 3, or 4) props.                       |
| customParagraph  | Accepts a `text` prop of type `string` for the paragraph view.                   |
| customQuote      | Accepts `text` (string) and `owner` (string) props.                              |
| customCheckList  | Accepts an array of objects with `value` (string) and `checked` (boolean) props. |
| customMenu       | Accepts a `close` prop, a function to close the menu. Set to `null`.             |

## Contribution

We welcome contributions! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).Feel free to use or modify as needed!
