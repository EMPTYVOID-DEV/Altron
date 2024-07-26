<script>
	/**@type {string}*/
	export let text;
	/**@type {1|2|3|4}*/
	export let level;
</script>

<div class="viewHeader">
	{#if level == 1}
		<h1>{text}</h1>
	{:else if level == 2}
		<h2>{text}</h2>
	{:else if level == 3}
		<h3>{text}</h3>
	{:else}
		<h4>{text}</h4>
	{/if}
</div>

<style>
	.viewHeader {
		color: var(--textColor);
		white-space: pre-wrap;
	}
</style>
