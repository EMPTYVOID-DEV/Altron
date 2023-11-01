<script lang="ts">
	import { data } from '$lib/utils/store';
	import CloseQuoteIcon from '../icons/closeQuoteIcon.svelte';
	import OpenQuote from '../icons/openQuoteIcon.svelte';
	import Input from './input.svelte';
	import Textarea from './textarea.svelte';

	export let content: { text: string; owner: string };
	export let id: string;
	export let active = false;
</script>

{#if active}
	<div class="quoteEdit">
		<Input
			value={content.owner}
			label="Quote owner"
			changeHandler={(textContent) => {
				data.update((prev) => {
					prev.forEach((el) => {
						if (el.id == id && el.type == 'quote') el.data.owner = textContent;
					});
					return prev;
				});
			}}
		/>
		<div>
			<span>The quote</span>
			<Textarea
				textContent={content.text}
				textLevel="body"
				changeHandler={(textContent) => {
					data.update((prev) => {
						prev.forEach((el) => {
							if (el.id == id && el.type == 'quote') el.data.text = textContent;
						});
						return prev;
					});
				}}
			/>
		</div>
	</div>
{:else}
	<div class="quote">
		<span class="quoteContent"><OpenQuote />{content.text}<CloseQuoteIcon /></span>
		<span class="quoteOwner">{content.owner}</span>
	</div>
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
	}
	.quoteEdit div span {
		margin-left: 10px;
		font-weight: bold;
		font-size: var(--small);
	}
	.quote {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.quote .quoteOwner {
		align-self: flex-end;
		color: var(--primaryColor);
		text-transform: capitalize;
		font-weight: bold;
	}
	.quote .quoteContent {
		padding-left: 10px;
		font-size: var(--small);
	}
</style>
