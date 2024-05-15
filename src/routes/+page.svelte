<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import { componentMap } from '../registry/2.0.0/index';
	let main: Main = null;
</script>

<div>
	<Main
		sizeLimits={{ attachments: 1.2, imgs: 1.2 }}
		{componentMap}
		initialData={[{ name: 'paragraph', id: '8', data: { text: 'hi' } }]}
		bind:this={main}
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
