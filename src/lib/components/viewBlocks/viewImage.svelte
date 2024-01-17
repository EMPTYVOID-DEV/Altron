<script lang="ts">
	export let src: string;
	export let caption: string;
</script>

{#if src == ''}
	<span class="notSelected">An image has not been uploaded yet</span>
{:else}
	<div class="imageView">
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img {src} alt="sorry the image didnt load" />
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
