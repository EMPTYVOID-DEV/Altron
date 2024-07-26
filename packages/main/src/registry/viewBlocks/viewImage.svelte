<script>
	/**@type {string}*/
	export let src;
	/**@type {string}*/
	export let caption;
</script>

<div class="imageView">
	<img {src} alt="Did not load" />
	<span>{caption}</span>
</div>

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

	.imageView span {
		color: var(--textColor);
		font-weight: bold;
		text-transform: capitalize;
	}
</style>
