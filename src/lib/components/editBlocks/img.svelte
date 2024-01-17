<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Input from '../extra/input.svelte';
	import Upload from '../extra/upload.svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { content: File; state: { caption: string; src: string } };
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
		{#if content.state.src == ''}
			<h3 class="notSelected">Image not selected</h3>
		{:else}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={content.state.src} alt="sorry image didnt load" />
		{/if}
		<Input
			label="Image caption"
			value={content.state.caption}
			changeHandler={(text) => {
				updateData(id, (el) => {
					if (el.name == 'image') el.data.state.caption = text;
				});
			}}
		/>
		<Upload
			fileType="image/*"
			label="Image source"
			currentFileName={content.content ? content.content.name : 'not selected'}
			changeHandler={(file) => {
				updateData(id, (el) => {
					if (el.name == 'image' && checkType(file.type)) {
						el.data.content = file;
						URL.revokeObjectURL(el.data.state.src);
						el.data.state.src = URL.createObjectURL(file);
					}
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content.state} />
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
