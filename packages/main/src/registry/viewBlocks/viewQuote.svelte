<script>
	import { getContext } from 'svelte';

	/**@type {string}*/
	export let text;
	/**@type {string}*/
	export let owner;
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const CloseQuoteIcon = componentMap.get('closeQuoteIcon');
	const OpenQuoteIcon = componentMap.get('openQuoteIcon');
</script>

<div class="quote">
	<svelte:component this={OpenQuoteIcon} />
	<span class="quoteContent">{text}</span>
	<svelte:component this={CloseQuoteIcon} />
	<span class="quoteOwner">{owner}</span>
</div>

<style>
	.quote {
		width: 100%;
		display: flex;
		flex-direction: column;
		color: var(--textColor);
	}
	.quote .quoteOwner {
		align-self: flex-end;
		color: var(--primaryColor);
		text-transform: capitalize;
		font-weight: bold;
	}
	.quote .quoteContent {
		padding-left: 10px;
		font-size: var(--small);
	}
</style>
