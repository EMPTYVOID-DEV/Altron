<script>
	import CopyIcon from '../icons/copyIcon.svelte';
	import DoneIcon from '../icons/doneIcon.svelte';
	export let text;
	export let lang;
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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if !copyStatement}
			<span on:click|stopPropagation={copyCode} class="control"><CopyIcon /></span>
		{:else}
			<span><DoneIcon /></span>
		{/if}
	</div>

	<code>{text}</code>
</div>

<style>
	#codeMdBlock {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 5px;
		border-radius: 5px;
		background-color: color-mix(in srgb, var(--primaryColor) 40%, white 0%);
		padding-bottom: 10px;
		overflow: hidden;
		color: var(--textColor);
	}

	#codeMdBlock > code {
		padding-left: 10px;
	}

	#codeMdBlock #lang {
		width: 100%;
		background-color: var(--primaryColor);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 10px;
		padding-block: 5px;
	}

	#codeMdBlock #lang span {
		font-weight: bold;
		text-transform: capitalize;
	}
	.control {
		cursor: pointer;
	}
</style>
