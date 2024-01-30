<script>
	export let src;
	export let caption;
</script>

{#if src == ''}
	<span class="notSelected">The image did'nt get uploaded</span>
{:else}
	<div class="imageView">
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img {src} alt="Sorry the image did not load" />
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
		border-left: 5px solid var(--errorColor);
		padding-left: 10px;
		padding-block: 10px;
	}
	.imageView span {
		color: var(--textColor);
		font-weight: bold;
		text-transform: capitalize;
	}
</style>
