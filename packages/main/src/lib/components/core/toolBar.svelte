<script lang="ts">
	import type { blocks, dataBlock } from '../../utils/types';
	import { getContext, createEventDispatcher, SvelteComponent, type ComponentType } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { nanoid } from 'nanoid';
	const languages = getContext('languages');
	const defaultData = new Map<blocks, any>([
		['paragraph', { text: '' }],
		['image', { file: null, caption: '', src: '' }],
		['code', { text: '', lang: languages[0] }],
		['quote', { text: '', owner: '' }],
		['header', { text: '', level: 4 }],
		['list', { items: [], type: 'ordered' }],
		['space', { size: 0 }],
		['checklist', { items: [] }],
		['attachment', { file: null, title: '', size: 0, src: '', type: '' }],
		['embed', { src: '' }]
	]);
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const toolBarUI = componentMap.get('toolBarUi');
	const dispatch = createEventDispatcher<{ afterEditing: { id: string } }>();
	const workingBlock: Writable<{ state: 'focused' | 'editing'; id: string }> =
		getContext('workingBlock');
	const setData = getContext('setData') as (
		newData: dataBlock[] | ((prev: dataBlock[]) => dataBlock[])
	) => void;
	function add(name: blocks) {
		const defaultValue = structuredClone(defaultData.get(name));
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
