<script lang="ts">
	export let base64: string;
	export let caption: string;
	export let name: string;
	import defaultImg from '../../assets/default.jpg';
	let fallback = base64 == '';
</script>

<div class="imageView">
	{#if fallback}
		<img src={defaultImg} alt="favicon" />
	{:else}
		<img src={base64} alt="sorry {name} image does not exist" on:error={() => (fallback = true)} />
	{/if}
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
		font-weight: 600;
	}
</style>
