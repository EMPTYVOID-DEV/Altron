<script>
	import { getContext } from 'svelte';

	/**@type {string}*/
	export let text;
	/**@type {string}*/
	export let lang;
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const DoneIcon = componentMap.get('doneIcon');
	const CopyIcon = componentMap.get('copyIcon');
	let copyStatement = false;
	function copyCode() {
		navigator.clipboard.writeText(text);
		copyStatement = true;
		new Promise((res) => setTimeout(res, 800)).then(() => (copyStatement = false));
	}
</script>

<div id="codeMdBlock" class={lang}>
	<div id="lang">
		<span>{lang}</span>
		{#if !copyStatement}
			<button on:click|stopPropagation={copyCode} class="control"
				><svelte:component this={CopyIcon} /></button
			>
		{:else}
			<span><svelte:component this={DoneIcon} /></span>
		{/if}
	</div>

	<code>{text}</code>
</div>

<style>
	#codeMdBlock {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		border-radius: 0.25rem;
		background-color: color-mix(in srgb, var(--primaryColor) 40%, white 0%);
		padding-bottom: 0.75rem;
		overflow: hidden;
		color: var(--textColor);
		--icon: var(--textColor);
	}

	#codeMdBlock > code {
		padding-left: 0.75rem;
	}

	#codeMdBlock #lang {
		width: 100%;
		background-color: var(--primaryColor);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 0.75rem;
		padding-block: 0.25rem;
	}

	#codeMdBlock #lang span {
		font-weight: bold;
		text-transform: capitalize;
	}
	.control {
		all: unset;
		cursor: pointer;
	}
</style>
