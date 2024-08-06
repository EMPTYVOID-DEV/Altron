<script>
	import { fade } from 'svelte/transition';
	import { elasticIn } from 'svelte/easing';
	import { getContext } from 'svelte';

	/**@type {(blockName:string)=>void}*/
	export let add;
	/**@type {string[]}*/
	const excludeBlocks = getContext('excludedBlocks');
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const CloseIcon = componentMap.get('closeIcon');
	const PlusIcon = componentMap.get('plusIcon');
	let options = new Map([
		['paragraph', componentMap.get('paragraphIcon')],
		['header', componentMap.get('headerIcon')],
		['image', componentMap.get('imageIcon')],
		['list', componentMap.get('listIcon')],
		['quote', componentMap.get('closeQuoteIcon')],
		['code', componentMap.get('codeIcon')],
		['space', componentMap.get('spaceIcon')],
		['checklist', componentMap.get('checklistIcon')],
		['attachment', componentMap.get('attachmentIcon')],
		['embed', componentMap.get('embedIcon')]
	]);
	options = filterOptions(options);
	let toggle = true;

	// here we re removing the options without icons (not loaded) also the excluded onces
	/**@param {Map<string,import("svelte").SvelteComponent>} map*/
	function filterOptions(map) {
		const entries = [...map];
		const filteredEntrier = entries.filter(
			(value) => value[1] && !excludeBlocks.find((el) => el == value[0])
		);
		return new Map(filteredEntrier);
	}
</script>

<div class="toolBar">
	<span on:click={() => (toggle = !toggle)} class="control">
		{#if toggle}
			<svelte:component this={CloseIcon} />
		{:else}
			<svelte:component this={PlusIcon} />
		{/if}
	</span>
	{#if toggle}
		<div class="options">
			{#each options.entries() as option, index}
				<span
					in:fade|global={{ delay: 80 * index, duration: 300, easing: elasticIn }}
					out:fade|global={{ delay: 80 * (6 - index), duration: 300, easing: elasticIn }}
					class="option"
					on:click|stopPropagation={() => {
						const blockName = option[0];
						add(blockName);
						toggle = true;
					}}
				>
					<svelte:component this={option[1]} />
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.toolBar {
		width: fit-content;
		display: grid;
		grid-template-columns: repeat(2, auto);
		align-items: center;
		gap: 20px;
		margin-top: 35px;
	}
	.toolBar span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		aspect-ratio: 1/1;
		border-radius: 50%;
		cursor: pointer;
	}

	.control {
		border: 2px solid var(--textColor);
		--icon: var(--textColor);
	}

	.options {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
	}
	.option {
		border: 2px solid var(--primaryColor);
		position: relative;
		--icon: var(--primaryColor);
	}
</style>
