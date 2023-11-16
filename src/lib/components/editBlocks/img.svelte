<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Input from '../extra/input.svelte';
	import Upload from '../extra/upload.svelte';
	import defaultImg from '../../assets/default.jpg';
	import type { updateDataType } from '$lib/utils/consts';
	export let content: { base64: string; name: string; caption: string };
	export let id: string;
	export let active = false;
	const updateData: updateDataType = getContext('updateData');
	const view: ComponentType<SvelteComponent<{ base64: string; caption: string }>> =
		getContext('Image');
</script>

{#if active}
	<div class="imageEdit">
		{#if content.base64 == ''}
			<img src={defaultImg} alt="default" />
		{:else}
			<img src={content.base64} alt="sorry {content.name} image does not exist" />
		{/if}
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
	.imageEdit img {
		width: 80%;
		margin-bottom: 10px;
		aspect-ratio: 2/1;
		border-radius: 8px;
		object-fit: cover;
		object-position: center;
	}
</style>
