<script>
	import { getContext } from 'svelte';
	import FormatParser from '../extra/formatParser.svelte';

	/**
	 * @typedef {'bold' | 'italic' | 'underline'} FormatType
	 */

	/**
	 * @typedef {{start: number; end: number; type: FormatType}} Format
	 */

	/**
	 * @typedef {{text: string; formats: Format[] }} FormattedText
	 */

	/**@type {FormattedText}*/
	export let formattedText;
	/**@type {string}*/
	export let owner;
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const CloseQuoteIcon = componentMap.get('closeQuoteIcon');
	const OpenQuoteIcon = componentMap.get('openQuoteIcon');
</script>

<div class="quote">
	<svelte:component this={OpenQuoteIcon} />
	<span class="quoteContent">
		<FormatParser {formattedText} />
	</span>
	<svelte:component this={CloseQuoteIcon} />
	<span class="quoteOwner">{owner}</span>
</div>

<style>
	.quote {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.quote .quoteOwner {
		align-self: flex-end;
		color: var(--primaryColor);
		text-transform: capitalize;
		font-weight: bold;
	}
	.quote .quoteContent {
		color: var(--textColor);
		padding-left: 0.75rem;
		font-size: var(--body);
		white-space: pre-wrap;
	}
</style>
