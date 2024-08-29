<script>
	import { getContext, onMount } from 'svelte';

	/**@type {(html:string)=>void}*/
	export let changeHandler;
	/**@type {string}*/
	export let label = '';
	/**@type {string} this the initial html created from the FormattedText object and it sanitized*/
	export let initialHtml;
	/**@type {number}*/
	export let width = 95;
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const boldIcon = componentMap.get('boldIcon');
	const italicIcon = componentMap.get('italicIcon');
	const underlineIcon = componentMap.get('underlineIcon');

	/** @type {HTMLSpanElement} */
	let editableArea;
	/**@type {Range}*/
	let cxRange;

	onMount(() => {
		editableArea.innerHTML = initialHtml;
	});

	function handleInputChange() {
		changeHandler(editableArea.innerHTML);
	}

	function handleSelection() {
		const cx = document.getSelection();
		cxRange = cx.getRangeAt(0);
	}

	function handleItalic() {
		createMarkup('italic');
		changeHandler(editableArea.innerHTML);
		emptySelection();
	}

	function handleBold() {
		createMarkup('bold');
		changeHandler(editableArea.innerHTML);
		emptySelection();
	}

	function handleUnderline() {
		createMarkup('underline');
		changeHandler(editableArea.innerHTML);
		emptySelection();
	}

	function emptySelection() {
		const cx = document.getSelection();
		cx.empty();
		cxRange = null;
	}

	/**
	 *
	 * @param {'bold' | 'italic' | 'underline'} type
	 */
	function createMarkup(type) {
		if (!cxRange) return;
		let element;
		switch (type) {
			case 'bold':
				element = document.createElement('b');
				break;
			case 'italic':
				element = document.createElement('i');
				break;
			case 'underline':
				element = document.createElement('u');
				break;
		}
		element.appendChild(cxRange.extractContents());
		cxRange.insertNode(element);
		removeEmptyNodes();
	}

	function removeEmptyNodes() {
		const walker = document.createTreeWalker(editableArea, NodeFilter.SHOW_ELEMENT);
		const nodesToRemove = [];
		while (walker.nextNode()) {
			const node = walker.currentNode;
			if (node.textContent.trim() === '') nodesToRemove.push(node);
		}
		nodesToRemove.forEach((node) => node.parentNode.removeChild(node));
	}
</script>

<div class="markupTextArea" style:width={`${width}%`}>
	<span class="header">{label}</span>
	<div class="editableAreaContainer">
		<div class="inlineElementMenu">
			<button class="option" on:click={handleBold}>
				<svelte:component this={boldIcon} />
			</button>
			<button class="option" on:click={handleItalic}>
				<svelte:component this={italicIcon} />
			</button>
			<button class="option" on:click={handleUnderline}>
				<svelte:component this={underlineIcon} />
			</button>
		</div>
		<span
			bind:this={editableArea}
			class="editableArea"
			contenteditable="true"
			on:pointerup|stopPropagation={handleSelection}
			on:contextmenu|preventDefault|stopPropagation={handleSelection}
			on:input={handleInputChange}
		/>
	</div>
</div>

<style>
	.markupTextArea {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.header {
		font-weight: 600;
		color: var(--textColor);
		font-size: var(--small);
	}

	.editableAreaContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 0.125rem solid var(--secondaryColor);
		border-radius: 0.25rem;
		padding: 0.5rem;
		gap: 0.5rem;
	}

	.editableArea {
		outline: none;
		width: 100%;
		color: var(--textColor);
		font-size: var(--body);
		font-weight: 400;
		font-family: var(--bodyFont);
		white-space: pre-wrap;
	}

	.inlineElementMenu {
		display: flex;
	}

	.option {
		all: unset;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-block: 0.125rem;
		padding-inline: 1rem;
		border: 1px solid var(--textColor);
		background-color: transparent;
		--icon: var(--textColor);
	}

	.option :global(svg) {
		width: 18px;
		height: 18px;
	}

	.option:hover {
		background-color: var(--secondaryColor);
	}
</style>
