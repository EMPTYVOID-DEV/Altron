<script lang="ts">
	export let value = '';
	export let label = '';
	export let type: 'text' | 'number' = 'text';
	export let changeHandler: (text: string) => void;
</script>

<div class="input-container">
	<label for="custom-input">{label}</label>
	<div>
		<input
			{type}
			{value}
			placeholder="Enter the {label.toLowerCase()}"
			class="custom-input"
			on:input={(e) => changeHandler(e.currentTarget.value)}
		/>
	</div>
</div>

<style>
	.input-container {
		width: 65%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 15px;
	}

	.input-container label {
		font-size: var(--small);
		font-weight: 600;
		margin-left: 10px;
		color: var(--textColor);
	}

	.input-container div {
		padding: 2px;
		border-radius: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 2px 2px 5px 5px color-mix(in srgb, var(--textColor) 28%, white 0%);
	}
	.input-container div:hover {
		border: 3px solid var(--secondaryColor);
	}

	.custom-input {
		width: 100%;
		padding-left: 8px;
		padding-block: 10px;
		font-size: var(--body);
		color: var(--textColor);
		border: 1px solid var(--secondaryColor);
		border-radius: 0.4rem;
		outline: none;
		position: relative;
	}
	.custom-input[type='number']::-webkit-outer-spin-button,
	.custom-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
</style>
