<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { FormattedText, updateDataType } from '../../utils/types';
	import { generateHTML, htmlToFormattedText } from '$lib/utils/utils';
	export let content: { formattedText: FormattedText };
	export let active = false;
	export let id: string;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const markupTextArea = componentMap.get('markupTextArea');
	const view = componentMap.get('viewParagraph');
	const updateData: updateDataType = getContext('updateData');

	function changeHandler(html: string) {
		updateData(id, (prev) => {
			if (prev.name == 'paragraph') htmlToFormattedText(prev.data.formattedText, html);
		});
	}
</script>

{#if active}
	<div class="editParagraph">
		<svelte:component
			this={markupTextArea}
			label="Paragraph content"
			initialHtml={generateHTML(content.formattedText)}
			{changeHandler}
		/>
	</div>
{:else}
	<svelte:component this={view} formattedText={content.formattedText} />
{/if}

<style>
	.editParagraph {
		width: 100%;
	}
</style>
