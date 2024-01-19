<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import BlockWrapper from './blockWrapper.svelte';
	import DropDown from '../extra/dialog.svelte';
	import type { Writable } from 'svelte/store';
	import type { dataBlock, eventTypes } from '../../utils/types';
	const editorId: string = getContext('editorId');
	const workingBlock: Writable<{ state: 'focused' | 'editing'; id: string }> =
		getContext('workingBlock');
	const eventDispatcher = createEventDispatcher<eventTypes>();
	const data = getContext('data') as Writable<dataBlock[]>;
	function traverseParent(element): { blockId: string; blockEditorId: string } {
		while (element) {
			let currentId = element?.dataset?.blockid;
			let editorId = element?.dataset?.editorid;
			if (typeof currentId == 'string' && typeof editorId == 'string') {
				return {
					blockId: currentId,
					blockEditorId: editorId
				};
			}
			element = element.parentElement;
		}
		return {
			blockEditorId: null,
			blockId: null
		};
	}

	function switchBlockState(event: MouseEvent) {
		const detail = traverseParent(event.target);
		// in case we clicked to different editor or element outside any editor
		const outFocus = !detail.blockId || detail.blockEditorId != editorId;
		// in case we clicked to focus a block
		const onFocus = !$workingBlock || $workingBlock.id != detail.blockId;
		if ($workingBlock?.state == 'editing' && (outFocus || onFocus))
			eventDispatcher('afterEditing', {
				id: $workingBlock.id
			});
		if (outFocus) return workingBlock.set(null);
		if (onFocus) {
			eventDispatcher('focusing', {
				id: detail.blockId
			});
			return workingBlock.set({
				id: detail.blockId,
				state: 'focused'
			});
		}
		if ($workingBlock.state == 'focused') {
			workingBlock.set({
				id: detail.blockId,
				state: 'editing'
			});
			eventDispatcher('editing', {
				id: detail.blockId
			});
		}
	}

	onMount(() => {
		window.addEventListener('click', switchBlockState);
		return () => {
			window.removeEventListener('click', switchBlockState);
		};
	});
</script>

{#each $data as block}
	<div class="block">
		<BlockWrapper dataBlock={block} />
		{#if $workingBlock?.id == block.id && $workingBlock.state == 'focused'}
			<DropDown />
		{/if}
	</div>
{/each}

<style>
	.block {
		display: flex;
		width: 100%;
		gap: 10px;
		align-items: center;
	}
</style>
