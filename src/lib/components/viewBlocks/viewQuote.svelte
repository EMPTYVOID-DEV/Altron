<script lang="ts">
	import CloseQuoteIcon from '../icons/closeQuoteIcon.svelte';
	import OpenQuote from '../icons/openQuoteIcon.svelte';
	export let text: string;
	export let owner: string;
</script>

<div class="quote">
	<span class="quoteContent"><OpenQuote />{text}<CloseQuoteIcon /></span>
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
