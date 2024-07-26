<script>
	import { getContext } from 'svelte';
	/**@type {(file:File)=>void}*/
	export let changeHandler;
	/**@type {string}*/
	export let label = '';
	/**@type {string}*/
	export let fileType = '*';
	/**@type {string}*/
	export let currentFileName = 'default.png';
	/**@type {Map<string,import("svelte").SvelteComponent>}*/
	const componentMap = getContext('componentMap');
	const UploadIcon = componentMap.get('uploadIcon');
</script>

<div class="input-container">
	<span class="header">{label}</span>
	<input
		type="file"
		id="custom-input"
		class="custom-input"
		accept={fileType}
		on:change={(e) => {
			const file = e.currentTarget.files[0];
			changeHandler(file);
		}}
	/>
	<div class="inputReplace">
		<label class="uploadBtn" for="custom-input">
			<span>Upload a file</span>
			<svelte:component this={UploadIcon} />
		</label>
		<span>{currentFileName}</span>
	</div>
</div>

<style>
	.input-container {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.input-container .header {
		color: var(--textColor);
		font-weight: 600;
		font-size: var(--small);
	}

	.inputReplace {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.inputReplace > span:last-child {
		text-align: center;
		color: var(--textColor);
	}

	.custom-input {
		display: none;
	}
	.uploadBtn {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 5px;
		border: 2px solid var(--secondaryColor);
		padding-inline: 8px;
		padding-block: 8px;
		border-radius: 0.5rem;
		--icon: var(--secondaryColor);
	}
	.uploadBtn > span {
		color: var(--textColor);
		font-size: var(--small);
		font-weight: 600;
	}
</style>
