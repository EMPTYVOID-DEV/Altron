<script lang="ts">
	import Main from '$lib/components/core/main.svelte';
</script>

<div>
	<Main />
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
