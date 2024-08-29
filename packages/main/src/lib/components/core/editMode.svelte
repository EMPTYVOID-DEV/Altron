<script lang="ts">
	import { createEventDispatcher, getContext, onMount, SvelteComponent } from 'svelte';
	import BlockWrapper from './blockWrapper.svelte';
	import type { Writable } from 'svelte/store';
	import type { dataBlock } from '../../utils/types';

	let dragIntialY = 0;
	const editorId: string = getContext('editorId');
	const workingBlock: Writable<{ state: 'focused' | 'editing'; id: string }> =
		getContext('workingBlock');
	const componentMap: Map<string, SvelteComponent> = getContext('componentMap');
	const menu = componentMap.get('menu');
	const data: Writable<dataBlock[]> = getContext('data');
	const dispatch = createEventDispatcher<{ afterEditing: { id: string } }>();

	function traverseParent(element: HTMLElement): { blockId: string; blockEditorId: string } {
		while (element) {
			const { blockid: currentId, editorid } = element.dataset;
			if (currentId && editorid) {
				return { blockId: currentId, blockEditorId: editorid };
			}
			element = element.parentElement;
		}
		return { blockEditorId: null, blockId: null };
	}

	function switchBlockState(event: PointerEvent) {
		const { blockId, blockEditorId } = traverseParent(event.target as HTMLElement);
		const outFocus = !blockId || blockEditorId !== editorId;
		const onFocus = !$workingBlock || $workingBlock.id !== blockId;

		if ($workingBlock?.state === 'editing' && (outFocus || onFocus)) {
			dispatch('afterEditing', { id: $workingBlock.id });
		}

		if (outFocus) {
			workingBlock.set(null);
		} else if (onFocus) {
			workingBlock.set({ id: blockId, state: 'focused' });
		} else if ($workingBlock.state === 'focused') {
			workingBlock.set({ id: blockId, state: 'editing' });
		}
	}

	function deleteBlock() {
		data.update((prev) => prev.filter((el) => $workingBlock.id != el.id));
	}

	function moveBlock({
		direction,
		id,
		distance
	}: {
		id: string;
		direction: 'up' | 'down';
		distance: number;
	}) {
		data.update((blocks) => {
			const index = blocks.findIndex((block) => block.id === id);
			const newIndex =
				direction === 'up'
					? Math.max(0, index - distance)
					: Math.min(blocks.length - 1, index + distance);

			if (index !== newIndex) {
				const [movedBlock] = blocks.splice(index, 1);
				blocks.splice(newIndex, 0, movedBlock);
			}
			return blocks;
		});
	}

	function handlePointerUp(e: PointerEvent & { target: HTMLElement }, draggedBlockId: string) {
		let currentY = e.clientY;
		let deltaY = currentY - dragIntialY;
		const distance = Math.floor(Math.abs(deltaY) / 80);

		if (distance > 0) {
			const direction = deltaY < 0 ? 'up' : 'down';
			moveBlock({ direction, id: draggedBlockId, distance });
		}
	}

	function handlePointerDown(e: PointerEvent & { target: HTMLElement }) {
		dragIntialY = e.clientY;
		e.target.setPointerCapture(e.pointerId);
	}

	onMount(() => {
		window.addEventListener('click', switchBlockState);
		return () => window.removeEventListener('click', switchBlockState);
	});
</script>

{#each $data as block}
	<div class="block">
		<BlockWrapper dataBlock={block} />
		{#if $workingBlock?.id === block.id && $workingBlock.state === 'focused'}
			<svelte:component
				this={menu}
				on:pointerdown={handlePointerDown}
				on:pointerup={(e) => handlePointerUp(e, block.id)}
				on:click={deleteBlock}
			/>
		{/if}
	</div>
{/each}

<style>
	.block {
		display: flex;
		width: 100%;
		gap: 0.5rem;
		align-items: center;
	}
</style>
