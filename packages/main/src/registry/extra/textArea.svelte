<script>
	/**@type {(val:string)=>void}*/
	export let changeHandler;

	/**@type {string}*/
	export let textContent;
	/**@type {0|1|2|3|4}*/
	export let textLevel;
	/**@type {string}*/
	export let label = '';
	/**@type {number}*/
	export let width = 95;
</script>

<div class="textArea" style:width={`${width}%`}>
	<span class="header">{label}</span>
	<span
		style:font-size={textLevel == 0 ? 'var(--body)' : `var(--h${textLevel})`}
		style:font-weight={textLevel == 0 ? '400' : 'bold'}
		style:font-family={textLevel == 0 ? 'var(--bodyFont)' : 'var(--headingFont)'}
		class="editableArea"
		contenteditable="true"
		bind:textContent
		on:input={() => {
			changeHandler(textContent);
		}}
	>
		{textContent}
	</span>
</div>

<style>
	.textArea {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.textArea > .header {
		font-weight: 600;
		color: var(--textColor);
		font-size: var(--small);
	}

	.editableArea {
		border: none;
		outline: none;
		min-height: 1rem;
		border-left: 0.25rem solid var(--secondaryColor);
		padding-left: 0.5rem;
		cursor: pointer;
		color: var(--textColor);
		white-space: pre-wrap;
	}
</style>
