<script>
	import PlusIcon from '../icons/plusIcon.svelte';
	import CloseIcon from '../icons/closeIcon.svelte';
	import { fade } from 'svelte/transition';
	import { elasticIn } from 'svelte/easing';
	import { getContext } from 'svelte';
	export let add;
	const componentMap = getContext('componentMap');
	let options = new Map([
		['paragraph', componentMap.get('paragraphIcon')],
		['header', componentMap.get('headerIcon')],
		['image', componentMap.get('imageIcon')],
		['list', componentMap.get('listIcon')],
		['quote', componentMap.get('quoteIcon')],
		['code', componentMap.get('codeIcon')],
		['space', componentMap.get('spaceIcon')],
		['checklist', componentMap.get('checkListIcon')],
		['attachment', componentMap.get('attachmentIcon')],
		['embed', componentMap.get('embedIcon')]
	]);
	options = filterOptions(options);
	let toggle = true;
	function filterOptions(map) {
		const entries = [...map];
		const filteredEntrier = entries.filter((value) => value[1] != undefined);
		return new Map(filteredEntrier);
	}
</script>

<div class="toolBar">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span on:click={() => (toggle = !toggle)} class="control">
		{#if toggle}
			<CloseIcon />
		{:else}
			<PlusIcon />
		{/if}
	</span>
	{#if toggle}
		<div class="options">
			{#each options.entries() as option, index}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
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
	}
	.option > :global(svg path) {
		fill: var(--primaryColor);
	}
</style>
