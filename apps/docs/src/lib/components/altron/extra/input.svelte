<script>
	export let value = '';
	export let label = '';
	export let type = 'text';
	export let changeHandler;
</script>

<div class="input-container">
	<label class="header" for="custom-input">{label}</label>
	<div class="inputWrapper">
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
		width: 80%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 6px;
	}

	.input-container .header {
		font-size: var(--small);
		font-weight: 600;
		color: var(--textColor);
	}

	.input-container .inputWrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.4rem;
		padding: 3px;
		height: 3rem;
	}
	.input-container .inputWrapper:hover {
		border: 3px solid var(--secondaryColor);
	}

	.custom-input {
		width: 100%;
		height: 100%;
		padding-left: 8px;
		padding-block: 10px;
		font-size: var(--body);
		color: var(--textColor);
		background-color: transparent;
		border: 1px solid var(--secondaryColor);
		border-radius: 0.3rem;
		outline: none;
		position: relative;
	}
	.custom-input[type='number']::-webkit-outer-spin-button,
	.custom-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
</style>
