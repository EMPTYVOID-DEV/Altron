<script>
	export let edited;
	export let focused;
	export let blockName;
</script>

<div class="blockWrapperUi" class:focused class:edited>
	<span class="blockName">{blockName}</span>
	<slot />
</div>

<style>
	.blockWrapperUi {
		width: 100%;
		position: relative;
		min-height: 50px;
		cursor: pointer;
	}

	.focused {
		--mainColor: var(--primaryColor);
	}
	.edited {
		--mainColor: var(--secondaryColor);
	}

	.focused,
	.edited {
		padding-top: 30px;
		padding-bottom: 10px;
		padding-inline: 15px;
		border-radius: 8px;
		border: 3px solid var(--mainColor);
	}

	.focused .blockName,
	.edited .blockName {
		display: inline-block;
	}

	.blockName {
		position: absolute;
		width: fit-content;
		height: fit-content;
		top: 0%;
		right: 0%;
		font-size: var(--small);
		color: var(--textColor);
		background-color: var(--mainColor);
		font-weight: bold;
		display: none;
		padding-inline: 12px;
		padding-block: 2px;
		border-bottom-left-radius: 12px;
		text-transform: capitalize;
	}
</style>
