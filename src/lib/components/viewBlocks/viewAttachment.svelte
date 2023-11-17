<script lang="ts">
	import UploadIcon from '../icons/uploadIcon.svelte';

	export let file: File;
	export let title: string;
	const mimeToFileNameMap = new Map([
		['application/pdf', 'pdf'],
		['application/msword', 'doc'],
		['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
		['application/vnd.ms-excel', 'xls'],
		['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'],
		['application/vnd.ms-powerpoint', 'ppt'],
		['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'pptx'],
		['text/plain', 'txt'],
		['application/zip', 'zip'],
		['image/jpeg', 'jpg'],
		['image/png', 'png'],
		['image/gif', 'gif']
	]);
</script>

<div class="attachment">
	{#if !file}
		<span class="notSelected">A file has'nt been uploaded yet</span>
	{:else}
		<div class="info">
			<span class="type">{mimeToFileNameMap.get(file.type) || 'file'}</span>
			<div class="subInfo">
				<span>{title}</span>
				<span>{file.size / Math.pow(10, 6)} Mb</span>
			</div>
		</div>
		<a href={URL.createObjectURL(file)} download={file.name} on:click|stopPropagation>
			<UploadIcon />
		</a>
	{/if}
</div>

<style>
	.attachment {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 10px;
		border-left: 6px solid var(--primaryColor);
	}
	.attachment .notSelected {
		color: var(--textColor);
		font-weight: bold;
	}
	.attachment .info {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.attachment .info .type {
		color: var(--primaryColor);
		font-weight: bold;
		text-transform: capitalize;
	}
	.subInfo {
		display: flex;
		flex-direction: column;
	}
	.subInfo span:first-child {
		color: var(--textColor);
		text-transform: capitalize;
		font-weight: bold;
	}
	.subInfo span:last-child {
		color: color-mix(in srgb, var(--primaryColor) 60%, white 0%);
	}
	.attachment a :global(path) {
		fill: var(--textColor);
	}
</style>
