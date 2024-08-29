<script>
	import { getContext } from 'svelte';

	/**@type {import("@altron/altron/types").FormattedText}*/
	export let formattedText;
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const formatParser = componentMap.get('formatParser');
</script>

<div class="viewParagraph">
	<svelte:component this={formatParser} {formattedText} />
</div>

<style>
	div {
		color: var(--textColor);
		white-space: pre-wrap;
	}
</style>
