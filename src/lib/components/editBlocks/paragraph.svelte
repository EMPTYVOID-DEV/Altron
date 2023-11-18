<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Textarea from '../extra/textarea.svelte';
	import type { updateDataType } from '../../utils/consts';
	export let content: { text: string };
	export let active = false;
	export let id: string;
	export let view: ComponentType<SvelteComponent<{ text: string }>> = getContext('Paragraph');
	const updateData: updateDataType = getContext('updateData');
	// *TODO : use custom paragraph
</script>

{#if active}
	<div class="editParagraph">
		<span>Paragraph content</span>
		<Textarea
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
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.editParagraph span {
		font-weight: bold;
		color: var(--textColor);
	}
</style>
