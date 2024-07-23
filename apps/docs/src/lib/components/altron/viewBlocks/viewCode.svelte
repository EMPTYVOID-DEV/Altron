<script>
	import { onedark } from 'svelte-highlight/styles';
	import { HighlightAuto } from 'svelte-highlight';
	import { getContext } from 'svelte';
	/**
	 * @type {string}
	 */
	export let text;
	/**
	 * @type {any}
	 */
	export let lang;
	const componentMap = getContext('componentMap');
	const DoneIcon = componentMap.get('doneIcon');
	const CopyIcon = componentMap.get('copyIcon');
	let copyStatement = false;
	async function copyCode() {
		navigator.clipboard.writeText(text);
		copyStatement = true;
		await new Promise((res) => setTimeout(res, 800));
		copyStatement = false;
	}
</script>

<svelte:head>
	{@html onedark}
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

	<HighlightAuto code={text}></HighlightAuto>
</div>

<style>
	#codeMdBlock {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	#codeMdBlock :global(> :not(#lang)) {
		width: 100%;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	#codeMdBlock :global(tr) {
		display: block;
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
