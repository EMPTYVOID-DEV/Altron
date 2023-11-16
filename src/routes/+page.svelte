<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import { onMount } from 'svelte';
	let main: Main = null;
	onMount(() => {
		main.setData([{ id: '12', name: 'header', data: { text: 'hello friend!', level: 1 } }]);
	});
</script>

<div>
	<Main bind:this={main} />
</div>

<style>
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
