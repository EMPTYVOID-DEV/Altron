<script>
	import { getContext } from 'svelte';

	/**@type {string}*/
	export let src;
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const Loading = componentMap.get('loading');
	const iframeSettings = getContext('iframeSettings');
	let state = 'loading';
</script>

{#if src == ''}
	<span class="errorEmbed">The embed content source is not valid</span>
{:else}
	<div class="embedView">
		<iframe
			class:show={state == 'working'}
			title="embed"
			{src}
			{...iframeSettings}
			on:load={() => (state = 'working')}
			on:error={() => (state = 'error')}
		/>
		<svelte:component this={Loading} visible={state == 'loading'} />
		{#if state == 'error'}
			<span class="errorEmbed">Sorry the content has failed to load</span>
		{/if}
	</div>
{/if}

<style>
	.errorEmbed {
		display: block;
		color: var(--textColor);
		font-weight: bold !important;
		border-left: 0.25rem solid var(--errorColor);
		padding-left: 0.75rem;
		padding-block: 0.75rem;
	}
	.embedView {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.embedView iframe {
		/* width should be below 95% to allow clicks that changes the state of the embed block */
		width: 85%;
		aspect-ratio: 3/2;
		overflow: hidden;
		display: none;
		border: none;
		outline: none;
	}
	.embedView .show {
		display: block;
	}
</style>
