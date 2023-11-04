<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Input from '../extra/input.svelte';
	import Textarea from '../extra/textarea.svelte';
	import { updateData } from '../../utils/functions';
	export let content: { text: string; owner: string };
	export let id: string;
	export let active = false;
	const view: ComponentType<SvelteComponent<{ text: string; owner: string }>> = getContext('Quote');
</script>

{#if active}
	<div class="quoteEdit">
		<Input
			value={content.owner}
			label="The Quote owner"
			changeHandler={(textContent) => {
				updateData(id, (prev) => {
					if (prev.name == 'quote') prev.data.owner = textContent;
				});
			}}
		/>
		<div>
			<span>The quote</span>
			<Textarea
				textContent={content.text}
				textLevel={0}
				changeHandler={(textContent) => {
					updateData(id, (prev) => {
						if (prev.name == 'quote') prev.data.text = textContent;
					});
				}}
			/>
		</div>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.quoteEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.quoteEdit div {
		display: flex;
		flex-direction: column;
		gap: 5px;
		color: var(-textColor);
	}
	.quoteEdit div span {
		margin-left: 10px;
		font-weight: bold;
		font-size: var(--small);
	}
</style>
