<script lang="ts">
	import type { updateDataType } from '../../utils/consts';
	import { type ComponentType, type SvelteComponent, getContext } from 'svelte';
	import Input from '../extra/input.svelte';
	export let id: string;
	export let active: boolean;
	export let content: { src: string };
	const acceptedEmbedSrcs: string[] = getContext('acceptedEmbedSrcs');
	const view: ComponentType<SvelteComponent<{ src: string }>> = getContext('Embed');
	const updateData: updateDataType = getContext('updateData');
	function acceptSrc(src: string) {
		const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
		if (!urlRegex.test(src)) return false;
		if (acceptedEmbedSrcs.length == 0) return true;
		for (let acceptedSrc of acceptedEmbedSrcs) {
			const match = acceptedSrc.match(/\/([gimuy]*)$/);
			const flags = match ? match[1] : '';
			const pattern = acceptedSrc.replace(/\/([gimuy]*)$/, '');
			const regex = new RegExp(pattern, flags);
			if (regex.test(src)) return true;
		}
		return false;
	}
</script>

{#if active}
	<div class="editEmbed">
		<Input
			label="Embed content source"
			type="text"
			value={content.src}
			changeHandler={(textContent) => {
				updateData(id, (el) => {
					if (el.name == 'embed') {
						el.data.src = acceptSrc(textContent) ? textContent : '';
					}
				});
			}}
		/>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.editEmbed {
		width: 100%;
	}
</style>
