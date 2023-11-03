<script lang="ts">
	export let items: string[];
	export let type: 'ordered' | 'unordered';
</script>

{#if type == 'ordered'}
	<ol>
		{#each items as item, index}
			<div class="item">
				<span class="index">{index + '.'}</span>
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
	ol .item .index {
		width: 2.2rem;
		height: 2.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--primaryColor);
		border-radius: 50%;
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	}
	ol .item li,
	ul li {
		background-color: color-mix(in srgb, var(--primaryColor) 34%, white 10%);
		padding: 6px;
		border-radius: 4px;
	}
	ol .item:nth-child(even) li,
	ul li:nth-child(even) {
		background-color: color-mix(in srgb, var(--secondaryColor) 34%, white 10%);
	}
	ol .item:nth-child(even) .index {
		border: 2px solid var(--secondaryColor);
	}
</style>
