<script>
	export let text;
	export let level;
</script>

{#if level == 1}
	<h1>{text}</h1>
{:else if level == 2}
	<h2>{text}</h2>
{:else if level == 3}
	<h3>{text}</h3>
{:else}
	<h4>{text}</h4>
{/if}
