<script lang="ts">
	import type { languages } from '../../utils/consts';
	import { getContext } from 'svelte';
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import CopyIcon from '../icons/copyIcon.svelte';
	import DoneIcon from '../icons/doneIcon.svelte';
	export let text: string;
	export let lang: languages;
	const theme = getContext('codeTheme');
	let copyStatement: boolean = false;
	async function copyCode(e: MouseEvent) {
		navigator.clipboard.writeText(text);
		copyStatement = true;
		await new Promise((res) => setTimeout(res, 800));
		copyStatement = false;
	}
</script>

<svelte:head>
	{@html theme}
</svelte:head>

<div id="codeMdBlock" class={lang}>
	<div id="lang">
		<span>{lang}</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if !copyStatement}
			<span on:click|stopPropagation={copyCode}><CopyIcon /></span>
		{:else}
			<span><DoneIcon /></span>
		{/if}
	</div>

	<HighlightAuto code={text} let:highlighted>
		<LineNumbers {highlighted} hideBorder wrapLines />
	</HighlightAuto>
</div>

<style>
	#codeMdBlock {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	#codeMdBlock > :global(:not(#lang)) {
		width: 100%;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	#codeMdBlock > :global(:not(#lang) code) {
		word-spacing: 1rem;
	}
	#codeMdBlock #lang {
		width: 100%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: var(--primaryColor);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 10px;
		padding-block: 5px;
	}
	#codeMdBlock #lang span {
		color: var(--textColor);
		font-weight: bold;
		text-transform: capitalize;
	}
	#codeMdBlock #lang span:last-child {
		cursor: pointer;
	}
</style>
