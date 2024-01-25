<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Input from '../extra/input.svelte';
	import Upload from '../extra/upload.svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { file: File; caption: string; src: string };
	export let id: string;
	export let active = false;
	const updateData: updateDataType = getContext('updateData');
	const view: ComponentType<SvelteComponent<{ src: string; caption: string }>> =
		getContext('Image');
	function checkType(type: string) {
		const typeArray = type.split('/');
		let testType = 'image/*'.split('/');
		if (testType[0] == typeArray[0]) return true;
		return false;
	}
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
			currentFileName={content.file ? content.file.name : ''}
			changeHandler={(file) => {
				updateData(id, (el) => {
					if (el.name == 'image' && checkType(file.type)) {
						el.data.file = file;
						URL.revokeObjectURL(el.data.src);
						el.data.src = URL.createObjectURL(file);
					}
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} caption={content.caption} src={content.src} />
{/if}

<style>
	.imageEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
