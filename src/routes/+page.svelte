<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import ToolBarUi from '../registry/v2.0.0/core/toolBarUI.svelte';
	import ParagraphIcon from '../registry/v2.0.0/icons/paragraphIcon.svelte';
	import HeaderIcon from '../registry/v2.0.0/icons/headerIcon.svelte';
	import BlockWrapperUi from '../registry/v2.0.0/core/blockWrapperUi.svelte';
	import Textarea from '../registry/v2.0.0/extra/textArea.svelte';
	import ViewParagraph from '../registry/v2.0.0/viewBlocks/viewParagraph.svelte';
	import ViewHeader from '../registry/v2.0.0/viewBlocks/viewHeader.svelte';
	import Select from '../registry/v2.0.0/extra/select.svelte';
	import Dialog from '../registry/v2.0.0/extra/dialog.svelte';
	const componentMap = new Map<string, ComponentType<SvelteComponent>>([
		['toolBarUi', ToolBarUi],
		['paragraphIcon', ParagraphIcon],
		['headerIcon', HeaderIcon],
		['blockWrapperUI', BlockWrapperUi],
		['textArea', Textarea],
		['viewParagraph', ViewParagraph],
		['viewHeader', ViewHeader],
		['select', Select],
		['dialog', Dialog]
	]);
	let main = null;
</script>

<div>
	<Main
		viewMode={true}
		intialData={[{ id: '12', name: 'header', data: { level: 1, text: 'thats great' } }]}
		bind:this={main}
		on:blockAdded={() => {
			console.log(main.getData());
		}}
		{componentMap}
		on:blockMoved={(e) => {
			console.log(e.detail);
		}}
		codeBlockLanguages={['c', 'fortant']}
	/>
</div>

<style>
	div {
		width: 50vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media screen and (width < 768px) {
		div {
			width: 100%;
		}
	}
</style>
