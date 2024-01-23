<script lang="ts">
	import UploadIcon from '../icons/uploadIcon.svelte';
	export let changeHandler: (file: File) => void;
	export let label = '';
	export let fileType: string = '*';
	export let currentFileName: string = 'default.png';
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
			<UploadIcon />
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
		margin-left: 10px;
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
