<script>
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
</script>

<div class="viewParagraph">
	<FormatParser {formattedText} />
</div>

<style>
	div {
		color: var(--textColor);
		white-space: pre-wrap;
	}
</style>
