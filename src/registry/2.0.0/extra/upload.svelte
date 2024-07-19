<script>
	import { getContext } from 'svelte';
	/**
	 * @type {Map<string,import("svelte").Component>}
	 */
	const componentMap = getContext('componentMap');
	const UploadIcon = componentMap.get('uploadIcon');
	/**
	 * @type {{label:string,fileType:string,currentFileName:string,changeHandler:(file:File)=>void}}
	 */
	let { changeHandler, label = '', fileType = '*', currentFileName = 'default.png' } = $props();
</script>

<div class="input-container">
	<span class="header">{label}</span>
	<input
		type="file"
		id="custom-input"
		class="custom-input"
		accept={fileType}
		onchange={(e) => {
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
	}
	.uploadBtn > span {
		color: var(--textColor);
		font-size: var(--small);
		font-weight: 600;
	}
</style>
