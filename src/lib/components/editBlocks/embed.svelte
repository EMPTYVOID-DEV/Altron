<script lang="ts">
	import type { updateDataType } from '../../utils/types';
	import { type ComponentType, type SvelteComponent, getContext } from 'svelte';
	import Input from '../extra/input.svelte';
	import Description from '../extra/description.svelte';
	export let id: string;
	export let active: boolean;
	export let content: { src: string };
	const acceptedEmbedSrcs: { rules: string[]; description: string } =
		getContext('acceptedEmbedSrcs');
	const processEmbedSrcs: (src: string) => string = getContext('processEmbedSrcs');
	const view: ComponentType<SvelteComponent<{ src: string }>> = getContext('Embed');
	const updateData: updateDataType = getContext('updateData');
	function acceptSrc(src: string) {
		const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
		if (!urlRegex.test(src)) return false;
		if (acceptedEmbedSrcs.rules.length == 0) return true;
		for (let acceptedSrc of acceptedEmbedSrcs.rules) {
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
		<Description title="accepted sources" description={acceptedEmbedSrcs.description} />
		<Input
			label="Embed content source"
			type="text"
			value={content.src}
			changeHandler={(textContent) => {
				updateData(id, (el) => {
					if (el.name == 'embed' && acceptSrc(textContent)) {
						el.data.src = processEmbedSrcs(textContent);
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
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
