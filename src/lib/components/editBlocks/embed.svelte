<script lang="ts">
	import type { updateDataType } from '../../utils/types';
	import { type ComponentType, type SvelteComponent, getContext } from 'svelte';
	import Input from '../extra/input.svelte';
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
		<div class="embedDesc">
			<span>Valid embeds</span>
			<p>{acceptedEmbedSrcs.description}</p>
		</div>
		<Input
			label="Embed content source"
			type="text"
			value={content.src}
			changeHandler={(textContent) => {
				updateData(id, (el) => {
					if (el.name == 'embed') {
						el.data.src = acceptSrc(textContent) ? processEmbedSrcs(textContent) : '';
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
	.embedDesc {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 30px;
	}
	.embedDesc span {
		font-weight: 600;
	}
	.embedDesc :is(span, p) {
		font-size: var(--small);
	}
</style>
