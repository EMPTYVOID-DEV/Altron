<script lang="ts">
	import { mimeToFileNameMap } from '../../utils/consts';
	import UploadIcon from '../icons/uploadIcon.svelte';
	export let src: string;
	export let title: string;
	export let type: string;
	export let size: number;
</script>

<div class="attachment">
	{#if src == ''}
		<span class="notSelected">A file has'not been uploaded yet</span>
	{:else}
		<div class="info">
			<span class="type">{mimeToFileNameMap.get(type) || 'file'}</span>
			<div class="subInfo">
				<span>{title}</span>
				<span>{(size / Math.pow(10, 6)).toString().substring(0, 5)} Mb</span>
			</div>
		</div>
		<a href={src} download={title} on:click|stopPropagation>
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
		gap: 10px;
		padding-inline: 10px;
		border-left: 6px solid var(--primaryColor);
	}
	.notSelected {
		color: var(--textColor);
		font-weight: bold;
		padding-block: 10px;
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
