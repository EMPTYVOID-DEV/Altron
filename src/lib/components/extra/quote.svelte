<script lang="ts">
	import { data } from '$lib/utils/store';
	import Textarea from './textarea.svelte';

	export let content: { text: string };
	export let id: string;
	export let active = false;
</script>

{#if active}
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
{:else}
	<div class="quote">
		<span>{content.text}</span>
	</div>
{/if}

<style>
	.quote {
		width: 100%;
		border-left: 8px solid var(--primaryColor);
		border-radius: 8px;
		background-color: color-mix(in srgb, var(--primaryColor) 28%, white 0%);
		padding-left: 8px !important;
	}
</style>
