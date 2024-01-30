<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';
	export let data: { componentMap: Map<string, ComponentType<SvelteComponent>> };
	let main: Main = null;
</script>

<div>
	<Main
		componentMap={data.componentMap}
		bind:this={main}
		intialData={[{ id: '12', name: 'paragraph', data: { text: 'hi' } }]}
		on:blockAdded={() => {
			console.log(main.getData());
		}}
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
