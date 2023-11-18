<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import { onMount } from 'svelte';
	let main: Main = null;
	onMount(() => {
		main.setData([
			{
				id: '33',
				name: 'header',
				data: { level: 2, text: 'hello friend' }
			}
		]);
	});
</script>

<div>
	<Main
		excludedBlocks={['code']}
		processEmbedSrcs={(src) => {
			const a = src.split('/');
			a.splice(a.length - 1, 0, 'embed');
			return a.join('/').replace('watch?v=', '');
		}}
		iframeSettings={{
			referrerpolicy: 'origin',
			credentialless: true
		}}
		bind:this={main}
		attachmentTypes="image/*"
	/>
</div>

<style>
	div {
		padding-block: 30px;
		width: 50vw;
	}

	@media screen and (width < 768px) {
		div {
			width: 95vw;
		}
	}
</style>
