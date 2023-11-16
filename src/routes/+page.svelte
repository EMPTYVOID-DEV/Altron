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
		bgColor="#121212"
		primaryColor="red"
		secondaryColor="blue"
		textColor="white"
		bind:this={main}
	/>
</div>

<style>
	:global(body) {
		background-color: #121212;
	}
	div {
		width: 50vw;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}

	@media screen and (width < 768px) {
		div {
			width: 95vw;
		}
	}
</style>
