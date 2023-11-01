<script lang="ts">
	export let value = '';
	export let label = '';
	export let changeHandler: (text: string) => void;
</script>

<div class="input-container">
	<label for="custom-input">{label}</label>
	<div>
		<input
			type="text"
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
		gap: 5px;
	}

	.input-container label {
		font-size: var(--small);
		font-weight: 600;
		margin-left: 10px;
		color: var(--fontColor);
	}

	.input-container div {
		padding: 2px;
		border-radius: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.input-container div:hover {
		border: 2px solid var(--secondaryColor);
	}

	.custom-input {
		width: 100%;
		padding-left: 8px;
		padding-block: 10px;
		font-size: var(--body);
		border: 1px solid var(--secondaryColor);
		border-radius: 0.4rem;
		outline: none;
		position: relative;
	}
</style>
