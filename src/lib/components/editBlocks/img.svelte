<script lang="ts">
	import { updateData } from '../../utils/functions';
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Input from '../extra/input.svelte';
	import Upload from '../extra/upload.svelte';
	export let content: { base64: string; name: string; caption: string };
	export let id: string;
	export let active = false;
	const view: ComponentType<SvelteComponent<{ base64: string; caption: string }>> =
		getContext('Image');
</script>

{#if active}
	<div class="imageEdit">
		<Input
			label="Image caption"
			value={content.caption}
			changeHandler={(text) => {
				updateData(id, (el) => {
					if (el.name == 'image') el.data.caption = text;
				});
			}}
		/>
		<Upload
			fileType="image/*"
			label="Image source"
			currentFileName={content.name}
			changeHandler={(base64, fileName) => {
				updateData(id, (el) => {
					if (el.name == 'image') {
						el.data.name = fileName;
						el.data.base64 = base64;
					}
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.imageEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
