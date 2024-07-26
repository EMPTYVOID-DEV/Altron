<script>
	/**@type {string[]}*/
	export let items;
	/**@type {string}*/
	export let type;
</script>

{#if type == 'ordered'}
	<ol>
		{#each items as item, index}
			<div class="item">
				<span class="index">{index + 1 + '.'}</span>
				<li>{item}</li>
			</div>
		{/each}
	</ol>
{:else}
	<ul>
		{#each items as item}
			<li>{item}</li>
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
		gap: 15px;
	}

	ul {
		list-style: inside;
	}

	ol .item {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		justify-content: start;
		gap: 12px;
	}
	ol .index {
		width: 2.2rem;
		height: 2.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	}
	ol .item:nth-child(even) .index {
		border: 2px solid var(--secondaryColor);
	}
	ol .item:nth-child(odd) .index {
		border: 2px solid var(--primaryColor);
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
		padding: 6px;
		border-radius: 4px;
	}
</style>
