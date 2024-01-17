<script lang="ts">
	import type { updateDataType } from '../../utils/types';
	import { getContext, type ComponentType, type SvelteComponent } from 'svelte';
	import Input from '../extra/input.svelte';
	import Upload from '../extra/upload.svelte';
	export let id: string;
	export let active: boolean;
	export let content: {
		content: File;
		state: { title: string; size: number; src: string; type: string };
	};
	const attachmentTypes: string = getContext('attachmentType');
	const updateData: updateDataType = getContext('updateData');
	const view: ComponentType<
		SvelteComponent<{ title: string; size: number; src: string; type: string }>
	> = getContext('Attachment');
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
			value={content.state.title}
			changeHandler={(text) => {
				updateData(id, (el) => {
					if (el.name == 'attachment') el.data.state.title = text;
				});
			}}
		/>
		<Upload
			fileType={attachmentTypes}
			label="Attachment source"
			currentFileName={content.content ? content.content.name : 'not selected'}
			changeHandler={(file) => {
				updateData(id, (el) => {
					if (el.name == 'attachment' && checkType(file.type)) {
						el.data.content = file;
						el.data.state.type = file.type;
						el.data.state.size = file.size;
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
	.editAttachment {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
