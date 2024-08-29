<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import type { updateDataType } from '../../utils/types';
	export let content: { file: File; caption: string; src: string };
	export let id: string;
	export let active = false;
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const input = componentMap.get('input');
	const upload = componentMap.get('upload');
	const updateData: updateDataType = getContext('updateData');
	const view = componentMap.get('viewImage');
	const sizeLimits = getContext('sizeLimits') as {
		imgs: number;
		attachments: number;
	};

	function checkType(type: string) {
		const typeArray = type.split('/');
		let testType = 'image/*'.split('/');
		if (testType[0] == typeArray[0]) return true;
		return false;
	}
	/**
	 * sizelimit can be -1 to indicate there is no size limit also it in mega bytes.
	 */

	function checkSize(sizeInBytes: number) {
		const sizeInMega = sizeInBytes / Math.pow(2, 20);
		if (sizeLimits.imgs == -1) return true;
		if (sizeInMega <= sizeLimits.imgs) return true;
		return false;
	}
</script>

{#if active}
	<div class="imageEdit">
		<svelte:component
			this={input}
			label="Image caption"
			value={content.caption}
			changeHandler={(text) => {
				updateData(id, (el) => {
					if (el.name == 'image') el.data.caption = text;
				});
			}}
		/>
		<svelte:component
			this={upload}
			fileType="image/*"
			label="Image source"
			currentFileName={content.file ? content.file.name : ''}
			changeHandler={(file) => {
				updateData(id, (el) => {
					if (el.name == 'image' && checkType(file.type) && checkSize(file.size)) {
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
		gap: 1rem;
	}
</style>
