<script lang="ts">
	import type { updateDataType } from '../../utils/types';
	import { getContext, type ComponentType, type SvelteComponent } from 'svelte';
	export let id: string;
	export let active: boolean;
	export let content: {
		file: File;
		title: string;
		size: number;
		src: string;
		type: string;
	};
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const input = componentMap.get('input');
	const upload = componentMap.get('upload');
	const view = componentMap.get('viewAttachment');
	const sizeLimits = getContext('sizeLimits') as {
		imgs: number;
		attachments: number;
	};
	const attachmentTypes: string = getContext('attachmentType');
	const updateData: updateDataType = getContext('updateData');
	function checkType(type: string) {
		const typeArray = type.split('/');
		if (attachmentTypes == '*') return true;
		for (let v of attachmentTypes.split(',')) {
			let testType = v.trim().split('/');
			if (testType[0] == typeArray[0] && (testType[1] == '*' || testType[1] == typeArray[1]))
				return true;
		}
		return false;
	}

	/**
	 * sizelimit can be -1 to indicate there is no size limit also it in mega bytes.
	 */

	function checkSize(sizeInBytes: number) {
		const sizeInMega = sizeInBytes / Math.pow(2, 20);
		if (sizeLimits.attachments == -1) return true;
		if (sizeInMega <= sizeLimits.attachments) return true;
		return false;
	}
</script>

{#if active}
	<div class="editAttachment">
		<svelte:component
			this={input}
			label="Attachment title"
			value={content.title}
			changeHandler={(text) => {
				updateData(id, (el) => {
					if (el.name == 'attachment') el.data.title = text;
				});
			}}
		/>
		<svelte:component
			this={upload}
			fileType={attachmentTypes}
			label="Attachment source"
			currentFileName={content.file ? content.file.name : ''}
			changeHandler={(file) => {
				updateData(id, (el) => {
					if (el.name == 'attachment' && checkType(file.type) && checkSize(file.size)) {
						URL.revokeObjectURL(el.data.src);
						el.data.file = file;
						el.data.type = file.type;
						el.data.size = file.size;
						el.data.src = URL.createObjectURL(file);
					}
				});
			}}
		/>
	</div>
{:else}
	<svelte:component
		this={view}
		type={content.type}
		size={content.size}
		title={content.title}
		src={content.src}
	/>
{/if}

<style>
	.editAttachment {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
