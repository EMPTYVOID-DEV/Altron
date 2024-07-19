<script>
	export let visible = false;
</script>

{#if visible}
	<div class="loading-container">
		<div class="loading-spinner" />
		<span>Loading...</span>
	</div>
{/if}

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding-block: 10px;
		gap: 10px;
	}

	.loading-spinner {
		border: 5px solid color-mix(in srgb, var(--primaryColor) 40%, white 0%);
		border-top: 5px solid var(--primaryColor);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
	}
	.loading-container span {
		font-weight: bold;
		color: var(--textColor);
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
