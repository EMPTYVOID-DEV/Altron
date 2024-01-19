<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let src: string;
	export let caption: string;
	let errorMsg: string = 'An image has not been uploaded yet';
	const eventDispatcher = createEventDispatcher();
</script>

{#if src == ''}
	<span class="notSelected">{errorMsg}</span>
{:else}
	<div class="imageView">
		<!-- svelte-ignore a11y-img-redundant-alt -->

		<img {src} alt="sorry the image did not load" />
		<h4>{caption}</h4>
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
		font-size: var(--h4);
		color: var(--primaryColor);
		text-transform: capitalize;
		font-weight: bold;
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
	.imageView h4 {
		color: var(--textColor);
		font-weight: 600;
	}
</style>
