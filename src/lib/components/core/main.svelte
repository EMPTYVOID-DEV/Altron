<script lang="ts">
	import { data } from '$lib/utils/store.js';
	import BlockWrapper from './blockWrapper.svelte';
	import ToolBar from './toolBar.svelte';
	export let headerFont = `Verdana, sans-serif`;
	export let bodyFont = `Helvetica, sans-serif`;
	export let primaryColor = '#3366FF';
	export let bgColor = '#dfe2ec';
	export let textColor = '#121212';
</script>

<div
	class="main"
	style="
	--primaryColor:{primaryColor};
	--fontColor:{textColor}; 
	--bgColor:{bgColor};
	--headingFont:{headerFont} ;
	--bodyFont:{bodyFont};
	--huge: clamp(3.8rem, calc(3.8rem + ((1vw - 0.48rem) * 1.3889)), 4.8rem);
	--h1: clamp(2.8rem, calc(2.8rem + ((1vw - 0.48rem) * 1.3889)), 3.8rem);
	--h2: clamp(2rem, calc(2rem + ((1vw - 0.48rem) * 1.3889)), 3rem);
	--h3: clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.5208)), 1.875rem);
	--h4: clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.3472)), 1.575rem);
	--body: clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem);
	--lh1: 1.3;
	--lh2: 1.35;
	--lh3: 1.4;
	--lh4: 1.5;
	--lhbody: 1.6;
	"
>
	<section class="toolBarWrapper">
		<ToolBar />
	</section>
	<section class="content">
		{#each $data as block (block.id)}
			<BlockWrapper dataBlock={block} />
		{/each}
	</section>
</div>

<style>
	.main {
		width: 100%;
		display: grid;
		grid-template-columns: 12% 86%;
		gap: 2%;
		align-items: start;
	}
</style>
