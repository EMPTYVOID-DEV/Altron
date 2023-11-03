<script lang="ts">
	import UploadIcon from '../icons/uploadIcon.svelte';

	export let label = '';
	export let changeHandler: (base64: string, fileName: string) => void;
	export let fileType: 'image/*' | '.pdf' = 'image/*';
	export let currentFileName: string = 'default.png';
</script>

<div class="input-container">
	<span>{label}</span>
	<input
		type="file"
		id="custom-input"
		class="custom-input"
		accept={fileType}
		on:change={(e) => {
			const file = e.currentTarget.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = () => {
					changeHandler(reader.result.toString(), file.name);
					currentFileName = file.name;
				};
				reader.readAsDataURL(file);
			}
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
		gap: 15px;
	}

	.input-container span,
	.input-container label {
		color: var(--textColor);
		font-size: var(--body);
	}

	.input-container span:first-child {
		font-weight: 600;
		margin-left: 10px;
		font-size: var(--small);
	}

	.inputReplace {
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 20px;
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
		padding-block: 10px;
		border-radius: 0.5rem;
		box-shadow: 2px 2px 5px 5px color-mix(in srgb, var(--textColor) 28%, white 0%);
	}
	.uploadBtn span {
		font-weight: 600;
	}
</style>
