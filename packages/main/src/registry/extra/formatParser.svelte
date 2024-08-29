<script>
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

	/**@param {FormattedText} formattedText*/
	function parseFormattedText(formattedText) {
		const points = new Set([
			0,
			formattedText.text.length,
			...formattedText.formats.flatMap((f) => [f.start, f.end])
		]);
		const sortedPoints = Array.from(points).sort((a, b) => a - b);

		return sortedPoints.slice(0, -1).map((start, i) => {
			const end = sortedPoints[i + 1];
			const segmentText = formattedText.text.slice(start, end);
			const segmentFormats = formattedText.formats
				.filter((format) => format.start <= start && format.end > start)
				.map((format) => format.type);

			return { text: segmentText, formats: segmentFormats };
		});
	}
</script>

{#each parseFormattedText(formattedText) as segment}
	{#if segment.formats.length == 0}
		{segment.text}
	{:else}
		<span
			class:bold={segment.formats.includes('bold')}
			class:italic={segment.formats.includes('italic')}
			class:underline={segment.formats.includes('underline')}>{segment.text}</span
		>
	{/if}
{/each}

<style>
	span {
		color: inherit;
		font-size: inherit;
	}

	.bold {
		font-weight: bold;
	}
	.italic {
		font-style: italic;
	}
	.underline {
		text-decoration: underline;
	}
</style>
