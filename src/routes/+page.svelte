<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import { onMount } from 'svelte';
	let main: Main = null;
	onMount(() => {
		setInterval(() => {
			console.log(main.getWorkingBlock());
		}, 3000);
	});
</script>

<div>
	<Main bind:this={main} />
	<Main />
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
	div {
		display: grid;
		width: 90vw;
		height: 100vh;
		align-items: flex-end;
		grid-template-columns: 40% 40%;
		gap: 5%;
		padding-bottom: 40px;
		padding-inline: 5%;
	}

	@media screen and (width < 768px) {
		div {
			width: 95vw;
		}
	}
</style>
