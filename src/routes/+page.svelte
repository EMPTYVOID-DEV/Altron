<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import { componentMap } from '../registry/2.0.0/index';
	let main: Main = null;
</script>

<div>
	<Main
		viewMode
		attachmentTypes="image/*"
		sizeLimits={{ attachments: 1.8, imgs: 1.8 }}
		{componentMap}
		initialData={[
			{ name: 'paragraph', id: '8', data: { text: 'hi' } },
			{ name: 'paragraph', id: '4', data: { text: 'hi' } }
		]}
		bind:this={main}
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
