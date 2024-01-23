<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Textarea from '../extra/textarea.svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { text: string };
	export let active = false;
	export let id: string;
	export let view: ComponentType<SvelteComponent<{ text: string }>> = getContext('Paragraph');
	const updateData: updateDataType = getContext('updateData');
	// *TODO : use custom paragraph
</script>

{#if active}
	<div class="editParagraph">
		<Textarea
			label="Paragraph content"
			textContent={content.text}
			textLevel={0}
			changeHandler={(textContent) => {
				updateData(id, (prev) => {
					if (prev.name == 'paragraph') prev.data.text = textContent;
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} text={content.text} />
{/if}

<style>
	.editParagraph {
		width: 100%;
	}
</style>
