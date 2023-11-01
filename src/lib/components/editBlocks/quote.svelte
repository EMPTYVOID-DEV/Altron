<script lang="ts">
	import { data } from '$lib/utils/store';
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Input from '../extra/input.svelte';
	import Textarea from '../extra/textarea.svelte';
	export let content: { text: string; owner: string };
	export let id: string;
	export let active = false;
	const view: ComponentType<SvelteComponent<{ text: string; owner: string }>> = getContext('Quote');
</script>

{#if active}
	<div class="quoteEdit">
		<Input
			value={content.owner}
			label="Quote owner"
			changeHandler={(textContent) => {
				data.update((prev) => {
					prev.forEach((el) => {
						if (el.id == id && el.name == 'quote') el.data.owner = textContent;
					});
					return prev;
				});
			}}
		/>
		<div>
			<span>The quote</span>
			<Textarea
				textContent={content.text}
				textLevel={0}
				changeHandler={(textContent) => {
					data.update((prev) => {
						prev.forEach((el) => {
							if (el.id == id && el.name == 'quote') el.data.text = textContent;
						});
						return prev;
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
	}
	.quoteEdit div span {
		margin-left: 10px;
		font-weight: bold;
		font-size: var(--small);
	}
</style>
