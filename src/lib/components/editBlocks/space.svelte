<script lang="ts">
	import Input from '../extra/input.svelte';
	import ViewSpace from '../viewBlocks/viewSpace.svelte';
	import type { updateDataType } from '../../utils/types';
	import { getContext } from 'svelte';
	export let content: { size: number };
	export let id: string;
	export let active = false;
	const updateData: updateDataType = getContext('updateData');
</script>

{#if active}
	<div class="spaceEdit">
		<Input
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
	<ViewSpace {...content} />
{/if}
