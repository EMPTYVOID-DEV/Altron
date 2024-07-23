## Props

### `ComponentMap`

- **Description:** This prop, as previously discussed, links the component name with its class reference. **Altron** sets it as context.
- **Type:** Map<string, ComponentType<SvelteComponent\>\>
- **Default value:** An empty map.

### `initialData`

- **Description:** Used to initialize the editor with data. The initial data must adhere to the **datablock** type, and the provided data undergoes validation to ensure unique IDs.
- **Type:** dataBlock[]
- **Default value:** An empty list.

### `viewMode`

- **Description:** Specifies whether **Altron** is used for editing or just viewing.
- **Type:** boolean
- **Default value:** false

### `iframeSettings`

- **Description:** This prop is an object that specifies the settings for the iframe used in the **embed block**. **Altron** sets it as context.
- **Type:** [iframeSettingsType](/docs/Usage/Types/#IframeSettings)
- **Default value:** An empty object.

### `attachmentTypes`

- **Description:** Restricts the accepted attachments by the **attachment block** to the chosen [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).
- **Type:** string
- **Default value:** "\*"

### `acceptedEmbedSrcs`

- **Description:** Provides a description of the accepted sources by the embed block and a list of regex rules to match these accepted sources.
- **Type:** { rules: string[], description: string}
- **Default value:** {
  description: 'You should enter a valid URL for an embed; any source is accepted',
  rules: [] }

### `processEmbedSrcs`

- **Description:** A method that processes the accepted source before setting it to the block value.
- **Type:** (src:string)=>string
- **Default value:** (src)=>src

### `codeBlockLanguages`

- **Description:** The list of languages that end-users can choose inside the code block.
- **Type:** string[]
- **Default value:** ['javascript', 'java','c','css','plaintext','typescript','python','csharp']

### `excludedBlocks`

- **Description:** The list of blocks you want to exclud from the toolbar.
- **Type:** block[]
- **Default value:** []

### `sizeLimits`

- **Description:** This prop sets a size limit on images and attachments that get loaded
- **Type:** {imgs:number,attachments:number}
- **Default value:** {imgs:-1,attachments:-1}
- **Notes** : -1 means no size limit and the size is in mega bytes.

## Css variables

| Variable          | Default Value                                                        |
| ----------------- | -------------------------------------------------------------------- |
| --width           | 95%                                                                  |
| --primary-color   | #3367ff                                                              |
| --secondary-color | #2eeb36                                                              |
| --text-color      | #121213                                                              |
| --bg-color        | #ffffff                                                              |
| --heading-font    | 'Verdana, sans-serif'                                                |
| --body-font       | 'Helvetica, sans-serif'                                              |
| --h1-size         | clamp(, calc(1.8rem + ((1vw - 0.48rem) \* 0.9722)), 2.1rem)          |
| --h1-size         | clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) \* 0.9722)), 1.8rem)    |
| --h3-size         | clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) \* 0.9722)), 1.5rem)    |
| --h4-size         | clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) \* 0.3472)), 1.2rem) |
| --body-size       | clamp(2rem, calc(1rem + ((1vw - 0.48rem) \* 0.1736)), 1.125rem)      |
| --small-size      | clamp(1.875rem, calc(0.875rem + ((1vw - 0.48rem) \* 0.1736)), 1rem)  |
| --lh1-size        | 1.3                                                                  |
| --lh2-size        | 1.35                                                                 |
| --lh3-size        | 1.4                                                                  |
| --lh4-size        | 1.5                                                                  |
| --lbody-size      | 2.6                                                                  |
| --block-gap       | 10px                                                                 |
