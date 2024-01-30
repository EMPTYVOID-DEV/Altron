<script>
	import { getContext } from 'svelte';
	export let items;
	const componentMap = getContext('componentMap');
	const Checked = componentMap.get('checkedIcon');
	const UnChecked = componentMap.get('unCheckedIcon');
</script>

<div class="checkListView">
	{#each items as item}
		<div class="checkItem">
			{#if item.checked}
				<svelte:component this={Checked} />
			{:else}
				<svelte:component this={UnChecked} />
			{/if}
			<span style:text-decoration={item.checked ? 'line-through' : 'none'}>{item.value}</span>
		</div>
	{/each}
</div>

<style>
	.checkListView {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.checkListView .checkItem {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, auto);
		align-items: center;
		justify-content: start;
		gap: 10px;
	}
	.checkListView span {
		color: var(--textColor);
	}
</style>
