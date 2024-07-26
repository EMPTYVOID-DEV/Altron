<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import { componentMap } from '../registry/index';
	let main: Main = null;
</script>

<div>
	<Main
		{componentMap}
		bind:this={main}
		sizeLimits={{ attachments: 1, imgs: 1 }}
		on:blockMoved={(e) => console.log(e)}
		on:blockDeleted={(e) => console.log(e)}
	/>
</div>

<style>
	div {
		width: 80vw;
		padding-block: 40px;
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
