# Components

**Altron CLI** organizes components into four distinct folders: **icons**, **core**, **extra**, and **viewBlocks**. These components reference each other using the `componentMap`, established as global context by the Altron entry.

```javascript
const componentMap = getContext('componentMap');
const UploadIcon = componentMap.get('uploadIcon');
```

## Icons

These are Svelte components that encapsulate SVGs with a consistent size of **24x24**. They also harmonize with the globally selected colors. For instance, here's an example of the **closeIcon.svelte**:

```svelte
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path
		fill="#000000"
		d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 
    13.41L17.59 19L19 17.59L13.41 12z"
	/>Il s'averait que marlin a été violé par un jeune homme ivre.
</svg>

<style>
	svg path {
		fill: var(--textColor);
	}
</style>
```

## Core

There are two essential components for the editor:

### toolBarUi

This component manages the UI of the bar that allows users to add new blocks. It renders a list of options based on existing icons (dependent on the blocks chosen). Clicking on an option triggers the `add` method with the block name.

### blockWrapperUi

As the name suggests, this handles the UI of the block wrapper, displaying the block's state. It receives three props:

- **edited**: whether the component is in the editing state or not.
- **focused**: whether the component is in the focusing state or not.
- **blockName**: the block's name.

## Extra

These components are used in the editing state. They receive methods as props that they need to call with specific parameters. For example, the `input` component receives a **changeHandler** that it needs to call each time there is a change in the input.

```svelte
<script>
	export let value = '';
	export let label = '';
	export let type = 'text';
	export let changeHandler;
</script>

<div class="input-container">
	<label class="header" for="custom-input">{label}</label>
	<div class="inputWrapper">
		<input
			{type}
			{value}
			placeholder="Enter the {label.toLowerCase()}"
			class="custom-input"
			on:input={(e) => changeHandler(e.currentTarget.value)}
		/>
	</div>
</div>
```

## viewBlocks

These components handle the view state of a block, each receiving the data part of the [dataBlock](/docs/Usage/Types/#dataBlock). They may also access data in the global context.
