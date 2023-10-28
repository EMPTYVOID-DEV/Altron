<script lang="ts">
	export let changeHandler: (data: string) => void;
	export let textContent: string = '';
	export let textLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'body' = 'body';
</script>

<div class="areaWrapper">
	<span
		style:font-size="var(--{textLevel})"
		style:font-weight={textLevel == 'body' ? '400' : 'bold'}
		style:line-height="var(--l{textLevel})"
		style:font-family={textLevel == 'body' ? 'var(--bodyFont)' : 'var(--headingFont)'}
		class="editableArea"
		contenteditable="plaintext-only"
		bind:textContent
		on:change={(e) => {
			changeHandler(e.currentTarget.textContent);
		}}
	>
		{textContent}
	</span>
</div>

<style>
	.areaWrapper {
		width: 100%;
		border-left: 5px solid var(--primaryColor);
		padding-left: 4px;
	}
	.editableArea {
		width: 100%;
		color: var(--fontColor);
		border: none;
		outline: none;
	}
</style>
