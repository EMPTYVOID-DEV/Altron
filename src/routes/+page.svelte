<script>
	import Main from '$lib/components/core/main.svelte';
	let bp = false;
</script>

<Main viewMode={bp} />

<button
	on:click={() => {
		bp = true;
	}}>click</button
>
