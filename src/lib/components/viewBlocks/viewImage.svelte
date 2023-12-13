<script lang="ts">
	export let file: File;
	export let caption: string;
	let preview = file ? URL.createObjectURL(file) : null;
</script>

{#if !preview}
	<span class="notSelected">An image has not been uploaded yet</span>
{:else}
	<div class="imageView">
		<img
			src={preview}
			alt="sorry we coudnt render {file.name} "
			on:error={() => {
				preview = null;
			}}
		/>
		<span>{caption}</span>
	</div>
{/if}

<style>
	.imageView {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}
	.imageView img {
		width: 100%;
		aspect-ratio: 2/1;
		border-radius: 8px;
		object-fit: cover;
		object-position: center;
	}

	.notSelected {
		display: block;
		color: var(--textColor);
		font-weight: bold !important;
		border-left: 6px solid var(--primaryColor);
		padding-left: 10px;
		padding-block: 10px;
	}
	.imageView span {
		color: var(--textColor);
		font-weight: 600;
	}
</style>
