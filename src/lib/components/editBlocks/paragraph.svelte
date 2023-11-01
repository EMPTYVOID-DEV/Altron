<script lang="ts">
	import { data } from '$lib/utils/store';
	import Textarea from '../extra/textarea.svelte';
	export let content: { text: string };
	export let active = false;
	export let id: string;
</script>

{#if active}
	<Textarea
		textContent={content.text}
		textLevel="body"
		changeHandler={(textContent) => {
			data.update((prev) => {
				prev.forEach((el) => {
					if (el.id == id && el.name == 'paragraph') el.data.text = textContent;
				});
				return prev;
			});
		}}
	/>
{:else}
	<div class="paragraph">
		<p>{content.text}</p>
	</div>
{/if}

<style>
	.paragraph {
		width: 100%;
	}
</style>
