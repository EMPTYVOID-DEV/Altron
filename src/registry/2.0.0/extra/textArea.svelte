<script>
	/**
	 * @type {{textContent:string,textLevel: 0 | 1 | 2 | 3 | 4,label:string,width:number,changeHandler:(val:string)=>void}}
	 */
	let { changeHandler, textContent, textLevel, label, width } = $props();
</script>

<div class="textArea" style:width={`${width}%`}>
	<span class="header">{label}</span>
	<span
		style:font-size="var(--{textLevel == 0 ? 'body' : 'h' + textLevel})"
		style:font-weight={textLevel == 0 ? '400' : 'bold'}
		style:line-height="var(--l{textLevel == 0 ? 'body' : 'h'})"
		style:font-family={textLevel == 0 ? 'var(--bodyFont)' : 'var(--headingFont)'}
		class="editableArea"
		contenteditable="true"
		bind:textContent
		oninput={() => {
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
		gap: 6px;
	}
	.textArea > .header {
		font-weight: bold;
		color: var(--textColor);
		font-size: var(--small);
	}

	.editableArea {
		border: none;
		outline: none;
		min-height: 1rem;
		border-left: 5px solid var(--secondaryColor);
		padding-left: 8px;
		cursor: pointer;
		color: var(--textColor);
	}
</style>
