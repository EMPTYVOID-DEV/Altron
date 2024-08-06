<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
	import { componentMap } from '../registry/index';
	let main: Main = null;
</script>

<div>
	<Main
		--secondary-color="#ff6ec7"
		--bg-color="red"
		--text-color="red"
		--primary-color="blue"
		--body-font="var(--bodyFont)"
		--heading-font="var(--headerFont)"
		{componentMap}
		bind:this={main}
		sizeLimits={{ attachments: 1, imgs: 1 }}
	/>
</div>

<style>
	div {
		width: 80vw;
		padding-block: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: black;
	}

	@media screen and (width < 768px) {
		div {
			width: 100%;
		}
	}
</style>
