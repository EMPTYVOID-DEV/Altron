<script lang="ts">
	import type { blocks, dataBlock } from '../../utils/types';
	import { getContext, createEventDispatcher, SvelteComponent, type ComponentType } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { nanoid } from 'nanoid';

	const languages = getContext('languages');

	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;

	const toolBarUI = componentMap.get('toolBarUi');

	const dispatch = createEventDispatcher<{ afterEditing: { id: string } }>();

	const workingBlock: Writable<{ state: 'focused' | 'editing'; id: string }> =
		getContext('workingBlock');

	const setData = getContext('setData') as (
		newData: dataBlock[] | ((prev: dataBlock[]) => dataBlock[])
	) => void;

	function getDefaultData(block: blocks): any {
		switch (block) {
			case 'paragraph':
				return { text: '' };
			case 'image':
				return { file: null, caption: '', src: '' };
			case 'code':
				return { text: '', lang: languages[0] };
			case 'quote':
				return { text: '', owner: '' };
			case 'header':
				return { text: '', level: 4 };
			case 'list':
				return { items: [], type: 'ordered' };
			case 'space':
				return { size: 0 };
			case 'checklist':
				return { items: [] };
			case 'attachment':
				return { file: null, title: '', size: 0, src: '', type: '' };
			case 'embed':
				return { src: '' };
		}
	}

	function add(name: blocks) {
		const defaultValue = getDefaultData(name);
		const id = nanoid(8);
		setData((prev) => {
			prev.push({ id, name, data: { ...defaultValue } });
			return prev;
		});
		if ($workingBlock?.state == 'editing')
			dispatch('afterEditing', {
				id: $workingBlock.id
			});
		workingBlock.set({ id, state: 'editing' });
	}
</script>

<svelte:component this={toolBarUI} {add} />
