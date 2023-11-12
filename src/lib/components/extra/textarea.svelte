<script lang="ts">
	export let changeHandler: (data: string) => void;
	export let textContent: string = '';
	export let textLevel: 0 | 1 | 2 | 3 | 4 = 0;
	export let width = 100;
</script>

<div class="areaWrapper" style:width={`${width}%`}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span
		style:font-size="var(--{textLevel == 0 ? 'body' : 'h' + textLevel})"
		style:font-weight={textLevel == 0 ? '400' : 'bold'}
		style:line-height="var(--l{textLevel == 0 ? 'body' : 'h'})"
		style:font-family={textLevel == 0 ? 'var(--bodyFont)' : 'var(--headingFont)'}
		class="editableArea"
		contenteditable="plaintext-only"
		bind:textContent
		on:input={() => {
			changeHandler(textContent);
		}}
	>
		{textContent}
	</span>
</div>

<style>
	.areaWrapper {
		display: flex;
		align-items: center;
		min-height: 2rem;
		border-left: 6px solid var(--secondaryColor);
		padding-left: 8px !important;
		cursor: pointer;
	}
	.editableArea {
		width: 100%;
		color: var(--textColor);
		border: none;
		outline: none;
	}
</style>
