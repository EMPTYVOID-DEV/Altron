<script lang="ts">
	export let href: string;
	export let alt: string;
</script>

<div class="imageView">
	<img src={href} {alt} on:error={(ev) => {}} />
	<span>{alt}</span>
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
		aspect-ratio: 1/2;
		border-radius: 8px;
		object-fit: contain;
		object-position: center;
	}
</style>
