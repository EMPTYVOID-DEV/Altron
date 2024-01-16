<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Input from '../extra/input.svelte';
	import Upload from '../extra/upload.svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { file: File; caption: string };
	export let id: string;
	export let active = false;
	const updateData: updateDataType = getContext('updateData');
	const view: ComponentType<SvelteComponent<{ file: File; caption: string }>> = getContext('Image');
	$: preview = content.file ? URL.createObjectURL(content.file) : null;
	function checkType(type: string) {
		const typeArray = type.split('/');
		let testType = 'image/*'.split('/');
		if (testType[0] == typeArray[0]) return true;
		return false;
	}
</script>

{#if active}
	<div class="imageEdit">
		{#if !preview}
			<h3 class="notSelected">Image not selected</h3>
		{:else}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				src={preview}
				alt="sorry image does not exist"
				on:error={() => {
					preview = null;
				}}
			/>
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
			currentFileName={content.file ? content.file.name : 'not selected'}
			changeHandler={(file) => {
				updateData(id, (el) => {
					if (el.name == 'image') {
						el.data.file = checkType(file.type) ? file : null;
						//URL.revokeObjectURL(preview);
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

	.notSelected {
		color: var(--textColor);
		text-align: center;
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
