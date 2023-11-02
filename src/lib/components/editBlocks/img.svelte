<script lang="ts">
	import { updateData } from '$lib/utils/functions';
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Input from '../extra/input.svelte';
	export let content: { href: string; alt: string };
	export let id: string;
	export let active = false;
	const view: ComponentType<SvelteComponent<{ href: string; alt: string }>> = getContext('Image');
</script>

{#if active}
	<div class="imageEdit">
		<Input
			label="Image caption"
			value={content.alt}
			changeHandler={(text) => {
				updateData(id, (prev) => {
					if (prev.name == 'image') prev.data.alt = text;
				});
			}}
		/>
		<Input
			label="Image link"
			value={content.alt}
			changeHandler={(text) => {
				updateData(id, (prev) => {
					if (prev.name == 'image') prev.data.href = text;
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} href={content.href} alt={content.alt} />
{/if}

<style>
	.imageEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
