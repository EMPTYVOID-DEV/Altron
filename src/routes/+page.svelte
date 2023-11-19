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
	<Main width="400px" />
</div>

<style>
	div {
		width: 60vw;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media screen and (width < 768px) {
		div {
			width: 95vw;
		}
	}
</style>
