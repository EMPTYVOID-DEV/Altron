<script lang="ts">
	import { updateData } from '../../utils/functions';
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Textarea from '../extra/textarea.svelte';
	export let content: { text: string };
	export let active = false;
	export let id: string;
	export let view: ComponentType<SvelteComponent<{ text: string }>> = getContext('Paragraph');
	// *TODO : use custom paragraph
</script>

{#if active}
	<Textarea
		textContent={content.text}
		textLevel={0}
		changeHandler={(textContent) => {
			updateData(id, (prev) => {
				if (prev.name == 'paragraph') prev.data.text = textContent;
			});
		}}
	/>
{:else}
	<svelte:component this={view} text={content.text} />
{/if}
