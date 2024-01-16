<script lang="ts">
	import type { updateDataType } from '../../utils/types';
	import { getContext, type ComponentType, type SvelteComponent } from 'svelte';
	import Input from '../extra/input.svelte';
	import Upload from '../extra/upload.svelte';
	export let id: string;
	export let active: boolean;
	export let content: { file: File; title: string };
	const attachmentTypes: string = getContext('attachmentType');
	const updateData: updateDataType = getContext('updateData');
	const view: ComponentType<SvelteComponent<{ file: File; title: string }>> =
		getContext('Attachment');
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
</script>

{#if active}
	<div class="editAttachment">
		<Input
			label="Attachment title"
			value={content.title}
			changeHandler={(text) => {
				updateData(id, (el) => {
					if (el.name == 'attachment') el.data.title = text;
				});
			}}
		/>
		<Upload
			fileType={attachmentTypes}
			label="Attachment source"
			currentFileName={content.file == null ? 'not selected yet' : content.file.name}
			changeHandler={(file) => {
				updateData(id, (el) => {
					if (el.name == 'attachment') {
						el.data.file = checkType(file.type) ? file : null;
					}
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.editAttachment {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
