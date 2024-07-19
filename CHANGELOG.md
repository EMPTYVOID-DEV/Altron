# altron

## 3.0.4

### Patch Changes

- 624511c: 1-small ui adjustments
  2-adjusting removeBadBlocks to take in consideration all blocks
  3-removing mimetypes constant

## 3.0.3

### Patch Changes

- ea221a2: removing white-space and word-break from global styles of different elements

## 3.0.2

### Patch Changes

- df419dd: adding block wrapper with an id in viewMode

## 3.0.1

### Patch Changes

- 2ae1b5a: fixing css variables naming

## 3.0.0

### Major Changes

- fb99208: V3 changeset

## 2.2.1

### Patch Changes

- fa1df40: Using structured clone with default value in add function to make sure list block dont share the same reference

## 2.2.0

### Minor Changes

- 6802764: Adding size limit constraint

## 2.1.0

### Minor Changes

- cc6b4fc: adding excluded blocks main prop export which will limit the user options but won't affect the rendered blocks

## 2.0.6

### Patch Changes

- c7edb2f: changing the repo url in package.json

## 2.0.5

### Patch Changes

- fbf5fa6: fixing a typo on the initialData prop name

## 2.0.4

### Patch Changes

- d6903ff: fixing some global styles issues

## 2.0.3

### Patch Changes

- d46ecde: fixing the package exports and typescript mapping

## 2.0.2

### Patch Changes

- 607caf7: fixing the package exports

## 2.0.1

### Patch Changes

- c687d31: removing svelte-select from the dependencies

## 2.0.0

### Major Changes

- 87cf735: changes

  fixing menu issues
  fixing ssr
  fixing setting image and attachment source
  events typing
  validate data
  export types
  separate the non-logic components to a registry that get loaded on demand by the user using a cli.
  faster load time
  dynamic imports capabilities using an exported map of block dependencies.

## 1.2.1

### Patch Changes

- eda5946: using structured clone in blockUpdate event to get a deep copy from the blocks data and fixing the events namto be camelCase

## 1.2.0

### Minor Changes

- f16c6b8: changing image block from base64 to regular file

## 1.1.5

### Patch Changes

- c2951a9: changing the type of lang inside code block data from languages to string

## 1.1.4

### Patch Changes

- changing the logo

## 1.1.3

### Patch Changes

- fixing select and upload component responsivness and removing toolbar hover effect in mobile

## 1.1.2

### Patch Changes

- fixing bugs on spacing

## 1.1.1

### Patch Changes

- fixing viewMode to use custom View blocks

## 1.1.0

### Minor Changes

- fixing ui bugs and adding the width prop to change the editor default width

## 1.0.0

### Major Changes

- re-publishing altron-rich-text as scope package
