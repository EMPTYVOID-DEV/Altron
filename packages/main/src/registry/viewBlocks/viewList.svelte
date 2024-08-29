<script>
	import { getContext } from 'svelte';

	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const formatParser = componentMap.get('formatParser');
	/**@type {import("@altron/altron/types").FormattedText[]}*/
	export let items;
	/**@type {string}*/
	export let type;
</script>

{#if type == 'ordered'}
	<ol>
		{#each items as item, index}
			<div class="item">
				<span class="index">{index + 1 + '.'}</span>
				<li><svelte:component this={formatParser} formattedText={item} /></li>
			</div>
		{/each}
	</ol>
{:else}
	<ul>
		{#each items as item}
			<li><svelte:component this={formatParser} formattedText={item} /></li>
		{/each}
	</ul>
{/if}

<style>
	ul,
	ol {
		color: var(--textColor);
		list-style: none;
		text-transform: capitalize;
		inset: unset;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	ul {
		list-style: inside;
	}

	ol .item {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		justify-content: start;
		gap: 0.75rem;
	}
	ol .index {
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	}
	ol .item:nth-child(even) .index {
		border: 0.125rem solid var(--secondaryColor);
	}
	ol .item:nth-child(odd) .index {
		border: 0.125rem solid var(--primaryColor);
	}
	ol .item:nth-child(odd) li,
	ul li:nth-child(odd) {
		background-color: color-mix(in srgb, var(--primaryColor) 34%, white 10%);
	}
	ol .item:nth-child(even) li,
	ul li:nth-child(even) {
		background-color: color-mix(in srgb, var(--secondaryColor) 34%, white 10%);
	}

	li {
		padding: 0.25rem;
		border-radius: 0.25rem;
		white-space: pre-wrap;
	}
</style>
