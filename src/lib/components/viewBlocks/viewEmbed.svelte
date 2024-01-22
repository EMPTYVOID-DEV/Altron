<script lang="ts">
	import type { IframeSettings } from '../../utils/types';
	import { getContext } from 'svelte';
	import Loading from '../extra/loading.svelte';
	export let src: string;
	const iframeSettings: IframeSettings = getContext('iframeSettings');
	let state: 'loading' | 'error' | 'working' = 'loading';
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
		<Loading visible={state == 'loading'} />
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
		border-left: 6px solid var(--errorColor);
		padding-left: 10px;
		padding-block: 10px;
	}
	.embedView {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.embedView iframe {
		width: 85%;
		aspect-ratio: 2/1;
		overflow: hidden;
		display: none;
		border: none;
		outline: none;
	}
	.embedView .show {
		display: block;
	}
</style>
