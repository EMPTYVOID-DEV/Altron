<script lang="ts">
	import type { updateDataType } from '../../utils/types';
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	export let content: { size: number };
	export let id: string;
	export let active = false;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const input = componentMap.get('input');
	const view = componentMap.get('viewSpace');
	const updateData: updateDataType = getContext('updateData');
</script>

{#if active}
	<div class="spaceEdit">
		<svelte:component
			this={input}
			label="Space Block size"
			type="number"
			value={content.size.toString()}
			changeHandler={(val) => {
				updateData(id, (el) => {
					if (el.name == 'space') el.data.size = parseInt(val);
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}
