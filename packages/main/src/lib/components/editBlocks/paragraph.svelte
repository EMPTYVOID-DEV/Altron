<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { text: string };
	export let active = false;
	export let id: string;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const textArea = componentMap.get('textArea');
	const view = componentMap.get('viewParagraph');
	const updateData: updateDataType = getContext('updateData');
</script>

{#if active}
	<div class="editParagraph">
		<svelte:component
			this={textArea}
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
