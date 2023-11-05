<script lang="ts">
	import { updateData } from '../../utils/functions';
	import Input from '../extra/input.svelte';
	import ViewSpace from '../viewBlocks/viewSpace.svelte';
	export let content: { size: number };
	export let id: string;
	export let active = false;
</script>

{#if active}
	<div class="spaceEdit">
		<Input
			label="Space Block size"
			type="number"
			value="16"
			changeHandler={(val) => {
				updateData(id, (el) => {
					if (el.name == 'space') el.data.size = parseInt(val);
				});
			}}
		/>
	</div>
{:else}
	<ViewSpace size={content.size} />
{/if}
