<script lang="ts">
	import { updateData } from '$lib/utils/functions';
	import Input from '../extra/input.svelte';

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
	<div style:height={content.size + 'px'} style:width={'100%'} />
{/if}
