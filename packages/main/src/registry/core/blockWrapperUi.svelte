<script>
	/** @type {boolean}*/
	export let edited;
	/** @type {boolean}*/
	export let focused;
	/** @type {string}*/
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
		cursor: pointer;
		overflow-wrap: break-word;
		hyphens: auto;
		-webkit-hyphens: auto;
		-ms-hyphens: auto;
	}

	.focused {
		--mainColor: var(--primaryColor);
	}
	.edited {
		--mainColor: var(--secondaryColor);
	}

	.focused,
	.edited {
		padding-top: 2rem;
		padding-bottom: 0.5rem;
		padding-inline: 0.5rem;
		border-radius: 0.5rem;
		border: 0.18rem solid var(--mainColor);
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
		padding-inline: 0.75rem;
		padding-block: 0.125rem;
		border-bottom-left-radius: 0.75rem;
		text-transform: capitalize;
	}
</style>
